import { Outlet, NavLink } from 'react-router-dom'
import { Menu, Home, Settings, Users, MessageSquare } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function RootLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col border-r border-gray-200 bg-white">
        <div className="h-16 flex items-center px-6 border-b">
          <div className="font-semibold">ELEVEA</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <Item to="/" icon={<Home size={18} />}>Dashboard</Item>
          <Item to="/clients" icon={<Users size={18} />}>Clientes</Item>
          <Item to="/reviews" icon={<MessageSquare size={18} />}>Reviews</Item>
          <Item to="/settings" icon={<Settings size={18} />}>Configurações</Item>
        </nav>
        <div className="p-4">
          <a href="https://elevea.com" className="text-xs text-zinc-500">elevea.com</a>
        </div>
      </aside>

      {/* Content */}
      <div className="flex flex-col">
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur flex items-center gap-2 px-4">
          <button className="lg:hidden p-2 rounded-xl hover:bg-zinc-100">
            <Menu size={18} />
          </button>
          <div className="font-medium">Painel</div>
          <div className="ml-auto">
            <Button>Nova ação</Button>
          </div>
        </header>
        <main className="flex-1">
          <div className="container-page py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

function Item({ to, icon, children }: any) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition',
          isActive ? 'bg-rose-50 text-rose-600' : 'text-zinc-600 hover:bg-zinc-100',
        ].join(' ')
      }
    >
      {icon}<span>{children}</span>
    </NavLink>
  )
}
