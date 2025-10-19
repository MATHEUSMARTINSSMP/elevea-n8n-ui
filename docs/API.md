# 🔌 API Documentation

## 📡 Endpoints

### Admin
- `POST /api/admin/dashboard` - Dashboard administrativo
- `POST /api/admin/block-site` - Bloquear site
- `POST /api/admin/unblock-site` - Desbloquear site

### Analytics
- `POST /api/analytics/track` - Rastrear eventos
- `GET /api/analytics/dashboard` - Dashboard de analytics

### Client
- `GET /api/client/dashboard` - Dashboard do cliente
- `POST /api/client/update` - Atualizar dados do cliente

## 🔑 Autenticação
```javascript
headers: {
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json'
}
```

## 📊 Exemplos de Uso

### Rastrear Evento
```javascript
fetch('/api/analytics/track', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    siteSlug: 'meu-site',
    eventType: 'page_view',
    pageUrl: '/dashboard'
  })
});
```

### Bloquear Site
```javascript
fetch('/api/admin/block-site', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <admin-token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    siteSlug: 'site-do-cliente',
    action: 'block',
    reason: 'Pagamento em atraso'
  })
});
```
