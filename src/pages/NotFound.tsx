import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-4">
        <div className="text-7xl font-extrabold">404</div>
        <p className="text-zinc-600">Página não encontrada.</p>
        <Link to="/" className="btn btn-primary">Voltar ao início</Link>
      </div>
    </div>
  )
}