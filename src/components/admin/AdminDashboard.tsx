import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Users, 
  Globe, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Loader2,
  Search,
  Filter
} from 'lucide-react';

interface User extends Record<string, any> {
  id: string;
  email: string;
  name: string;
  site_slug: string;
  status: 'active' | 'blocked' | 'inactive' | 'suspended';
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    isLoading,
    error,
    getUserList,
    getSiteStatus,
    blockSite,
    unblockSite,
    suspendSite,
    activateSite,
    getStatusColor,
    getStatusText,
  } = useAdmin();

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [showActionModal, setShowActionModal] = useState<'block' | 'unblock' | 'suspend' | 'activate' | null>(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.site_slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [users, searchTerm]);

  const loadUsers = async () => {
    const result = await getUserList();
    if (result.success && result.data) {
      setUsers(result.data);
    }
  };

  const handleAction = async (action: 'block' | 'unblock' | 'suspend' | 'activate') => {
    if (!selectedUser || !actionReason.trim()) return;

    let result;
    const actionData = {
      siteSlug: selectedUser.site_slug,
      reason: actionReason,
      admin: user?.email || 'admin',
    };

    switch (action) {
      case 'block':
        result = await blockSite(actionData);
        break;
      case 'unblock':
        result = await unblockSite(actionData);
        break;
      case 'suspend':
        result = await suspendSite(actionData);
        break;
      case 'activate':
        result = await activateSite(actionData);
        break;
    }

    if (result.success) {
      setShowActionModal(null);
      setSelectedUser(null);
      setActionReason('');
      await loadUsers(); // Reload users
    }
  };

  const openActionModal = (user: User, action: 'block' | 'unblock' | 'suspend' | 'activate') => {
    setSelectedUser(user);
    setShowActionModal(action);
    setActionReason('');
  };

  if (!user || user.role !== 'admin') {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Acesso negado. Apenas administradores podem acessar este painel.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários e sites</p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Shield className="h-3 w-3" />
          <span>Admin</span>
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sites Ativos</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sites Bloqueados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === 'blocked').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sites Suspensos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === 'suspended').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários e Sites</CardTitle>
          <CardDescription>
            Gerencie o status dos usuários e seus sites
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por email, nome ou site..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Users Table */}
          <div className="border rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Site
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criado em
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.site_slug}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(user.status)}>
                          {getStatusText(user.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {user.status === 'active' && (
                            <>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => openActionModal(user, 'block')}
                                disabled={isLoading}
                              >
                                Bloquear
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openActionModal(user, 'suspend')}
                                disabled={isLoading}
                              >
                                Suspender
                              </Button>
                            </>
                          )}
                          {user.status === 'blocked' && (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => openActionModal(user, 'unblock')}
                              disabled={isLoading}
                            >
                              Desbloquear
                            </Button>
                          )}
                          {user.status === 'suspended' && (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => openActionModal(user, 'activate')}
                              disabled={isLoading}
                            >
                              Ativar
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Carregando usuários...</span>
                </div>
              ) : (
                'Nenhum usuário encontrado'
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Modal */}
      {showActionModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {showActionModal === 'block' && 'Bloquear Site'}
                {showActionModal === 'unblock' && 'Desbloquear Site'}
                {showActionModal === 'suspend' && 'Suspender Site'}
                {showActionModal === 'activate' && 'Ativar Site'}
              </CardTitle>
              <CardDescription>
                Site: {selectedUser.site_slug} ({selectedUser.name})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reason">Motivo da ação</Label>
                <Input
                  id="reason"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Descreva o motivo desta ação..."
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleAction(showActionModal)}
                  disabled={isLoading || !actionReason.trim()}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Confirmar'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowActionModal(null);
                    setSelectedUser(null);
                    setActionReason('');
                  }}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
