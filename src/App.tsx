import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Index'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        {/* adicione suas páginas reais aqui mantendo seus webhooks */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}