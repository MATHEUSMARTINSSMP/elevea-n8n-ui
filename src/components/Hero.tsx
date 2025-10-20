export default function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <h1 className="text-balance">
            Transforme seu <span className="bg-brand-500 text-white px-2 rounded-lg">negócio</span> em Sucesso Digital
          </h1>
          <p className="mt-4 max-w-xl">
            Sites profissionais, Google Meu Negócio e atendimento automatizado. Tudo em um só lugar.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="btn btn-primary" href="#whatsapp">Fale conosco no WhatsApp</a>
            <a className="btn btn-ghost" href="#planos">Ver Planos</a>
          </div>
          <div className="mt-8 hr-soft"></div>
          <ul className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <li><span className="font-semibold">+50</span><br/>Sites Criados</li>
            <li><span className="font-semibold">100%</span><br/>Responsivos</li>
            <li><span className="font-semibold">7 dias</span><br/>Para publicar</li>
          </ul>
        </div>
        <div className="card aspect-video" />
      </div>
    </section>
  )
}