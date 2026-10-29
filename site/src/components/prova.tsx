import { ArrowUpRight, Quote, Star } from "lucide-react";
import { config } from "@/lib/config";
import { depoimentosVisiveis, projetos } from "@/lib/content";
import { Reveal } from "./reveal";
import { Botao, Eyebrow, Titulo, WhatsAppIcon } from "./ui";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <Eyebrow>Portfólio</Eyebrow>
          <Titulo>Projetos que já saíram do papel</Titulo>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          {projetos.map((p) => (
            <Reveal key={p.cliente}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                className="group block h-full overflow-hidden rounded-[32px] border border-line bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_rgba(10,42,28,0.5)]"
              >
                {/* janela de navegador com o print do projeto */}
                <div className="border-b border-line bg-bg-alt p-4 pb-0">
                  <div className="flex items-center gap-1.5 pb-3">
                    <span className="size-2.5 rounded-full bg-ink/15" />
                    <span className="size-2.5 rounded-full bg-ink/15" />
                    <span className="size-2.5 rounded-full bg-ink/15" />
                    {p.url && (
                      <span className="ml-3 truncate rounded-full bg-card px-3 py-1 text-xs text-ink-soft">
                        {p.url.replace("https://", "")}
                      </span>
                    )}
                  </div>
                  <div className="aspect-[16/9] overflow-hidden rounded-t-xl bg-forest">
                    {p.imagem ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imagem} alt={`Site ${p.cliente}`} className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
                    ) : (
                      <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--color-brand)_0%,var(--color-forest)_60%)]">
                        <span className="font-display text-5xl font-extrabold text-white">{p.cliente}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold tracking-wider text-brand uppercase">{p.tipo}</span>
                      <h3 className="mt-1 font-display text-2xl font-extrabold">{p.cliente}</h3>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                  <p className="mt-3 text-ink-soft">{p.descricao}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-bg-alt px-3 py-1 text-xs font-medium text-ink-soft">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-[32px] bg-forest p-8 text-white">
              <div>
                <span className="font-display text-6xl leading-none font-extrabold text-lime">+1</span>
                <h3 className="mt-6 font-display text-2xl font-extrabold">O próximo pode ser o seu.</h3>
                <p className="mt-3 text-white/70">
                  Do site simples ao sistema completo: o mesmo cuidado em cada projeto. Me conta o que você precisa.
                </p>
              </div>
              <Botao mensagem="Oi! Vi seu portfólio e quero conversar sobre o meu projeto." variante="lima" className="mt-8">
                <WhatsAppIcon /> Quero ser o próximo
              </Botao>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Depoimentos() {
  if (depoimentosVisiveis.length === 0) return null;
  // duplica a lista para o carrossel rodar sem emenda
  const faixa = [...depoimentosVisiveis, ...depoimentosVisiveis];
  return (
    <section id="avaliacoes" className="overflow-hidden bg-bg-alt py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Avaliações</Eyebrow>
          <Titulo>Quem já tirou o site do papel</Titulo>
        </Reveal>
      </div>
      <div className="relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-5 px-5">
          {faixa.map((d, i) => (
            <figure
              key={i}
              aria-hidden={i >= depoimentosVisiveis.length || undefined}
              className="relative w-[320px] shrink-0 rounded-3xl border border-line bg-card p-7 sm:w-[380px]"
            >
              {d.exemplo && (
                <span className="absolute top-4 right-4 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                  EXEMPLO · não publica
                </span>
              )}
              <Quote className="size-8 text-brand/30" />
              <div className="mt-3 flex gap-0.5 text-brand">
                {Array.from({ length: d.estrelas }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">“{d.texto}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand-soft font-display font-extrabold text-brand">
                  {d.nome.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold">{d.nome}</span>
                  <span className="text-ink-soft">{d.negocio}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Sobre() {
  const primeiroNome = config.nome.split(" ")[0];
  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[340px_1fr] md:gap-16">
        <Reveal>
          {/* Troque por <img src="/foto.jpg" ...> quando tiver sua foto em /public */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] md:max-w-none">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[32px] bg-lime" />
            <div className="relative grid size-full place-items-center rounded-[32px] bg-forest">
              <span className="font-display text-[120px] leading-none font-extrabold text-lime">
                {primeiroNome.charAt(0)}
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>Quem vai fazer o seu site</Eyebrow>
          <Titulo>Oi, eu sou a {primeiroNome}.</Titulo>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Sou desenvolvedora e trabalho com tecnologia todos os dias: crio sistemas web, painéis de indicadores,
            automações e soluções com inteligência artificial para empresas.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Agora coloco essa experiência a serviço de quem precisa de um site bonito, rápido e que traga clientes, sem
            complicação. Você fala direto comigo do começo ao fim, sem agência no meio e sem esperar dias por uma
            resposta.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Python", "Inteligência artificial"].map((t) => (
              <span key={t} className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-medium">
                {t}
              </span>
            ))}
          </div>
          <Botao mensagem="Oi! Vi seu site e queria conversar sobre um projeto." className="mt-9">
            <WhatsAppIcon /> Falar comigo
          </Botao>
        </Reveal>
      </div>
    </section>
  );
}
