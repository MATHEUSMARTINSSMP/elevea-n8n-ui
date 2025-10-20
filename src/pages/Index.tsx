import Hero from '../components/Hero'
import { Card, CardHeader, CardTitle, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-900 mb-4">Confira nossos trabalhos</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Projetos por segmento — pensados para destacar a marca e gerar ação.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Moda Feminina', description: 'Landing de vitrine com foco em coleções e campanhas sazonais.' },
              { title: 'Moda Íntima', description: 'Showcase elegante com apresentação de linhas e chamadas para WhatsApp.' },
              { title: 'Moda Masculina', description: 'Site com hero dinâmico e seções de produtos para conversão.' },
              { title: 'Agência Elevea', description: 'Site institucional com apresentação de serviços e diferenciais.' },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl mb-4"></div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">{item.title}</h3>
                  <p className="text-zinc-600 text-sm mb-4">{item.description}</p>
                  <Button variant="ghost" className="w-full">Ver projeto</Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
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
                  <div className="text-3xl font-semibold text-brand-500">{m.v}</div>
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
      </section>
    </div>
  )
}