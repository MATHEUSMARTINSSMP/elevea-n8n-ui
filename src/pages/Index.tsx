import { Card, CardHeader, CardTitle, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: 'Clientes', v: '128' },
          { k: 'Leads (30d)', v: '934' },
          { k: 'Reviews ★4.8', v: '2.143' },
          { k: 'Receita MRR', v: 'R$ 37k' },
        ].map((m) => (
          <Card key={m.k}>
            <CardHeader>
              <CardTitle>{m.k}</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="text-3xl font-semibold">{m.v}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Atividades recentes</CardTitle>
          <Button className="ml-auto" variant="ghost">Ver tudo</Button>
        </CardHeader>
        <CardBody>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span>Novo lead capturado</span><span className="text-zinc-500">há 5 min</span></li>
            <li className="flex justify-between"><span>Review respondida</span><span className="text-zinc-500">há 14 min</span></li>
            <li className="flex justify-between"><span>Cliente atualizado</span><span className="text-zinc-500">há 31 min</span></li>
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}