import type { CSSProperties } from "react";
import {
  Calculator,
  ChartLine,
  Clock,
  CupSoda,
  Dumbbell,
  Flame,
  Flower2,
  Heart,
  House,
  type LucideIcon,
  PawPrint,
  Quote,
  Ruler,
  Scale,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
} from "lucide-react";
import type { Fonte, Icone, Modelo } from "@/lib/modelos";

const icones: Record<Icone, LucideIcon> = {
  dente: Smile,
  balanca: Scale,
  flor: Flower2,
  chama: Flame,
  haltere: Dumbbell,
  regua: Ruler,
  calculadora: Calculator,
  pata: PawPrint,
  coracao: Heart,
  estrela: Star,
  relogio: Clock,
  escudo: ShieldCheck,
  sparkles: Sparkles,
  copo: CupSoda,
  casa: House,
  grafico: ChartLine,
};

const fontes: Record<Fonte, string> = {
  bricolage: "var(--font-bricolage)",
  fraunces: "var(--font-fraunces)",
  grotesk: "var(--font-grotesk)",
};

// Renderiza o site de demonstração de um modelo. Com `apenasHero`, só a primeira dobra (usado nas miniaturas).
export function SiteModelo({ modelo, apenasHero = false }: { modelo: Modelo; apenasHero?: boolean }) {
  const { cores, negocio } = modelo;
  const estilo = {
    "--m-fundo": cores.fundo,
    "--m-texto": cores.texto,
    "--m-destaque": cores.destaque,
    "--m-texto-destaque": cores.textoDestaque,
    "--m-suave": cores.suave,
    "--m-cartao": cores.cartao,
    "--m-fonte": fontes[modelo.fonte],
  } as CSSProperties;

  return (
    <div style={estilo} className="@container bg-[var(--m-fundo)] font-sans text-[var(--m-texto)]">
      {modelo.layout === "dividido" && <HeroDividido modelo={modelo} />}
      {modelo.layout === "centro" && <HeroCentro modelo={modelo} />}
      {modelo.layout === "cinema" && <HeroCinema modelo={modelo} />}
      {!apenasHero && (
        <>
          <Servicos modelo={modelo} />
          <Sobre modelo={modelo} />
          {modelo.tipo === "Landing page" && <Oferta modelo={modelo} />}
          <Contato modelo={modelo} />
          <footer className="border-t border-[color-mix(in_srgb,var(--m-texto)_12%,transparent)] px-6 py-8 text-center text-sm opacity-60">
            © {negocio.nome} · Site de demonstração
          </footer>
        </>
      )}
    </div>
  );
}

function Titulo({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 style={{ fontFamily: "var(--m-fonte)" }} className={`leading-[1.02] font-extrabold tracking-[-0.03em] text-balance ${className}`}>
      {children}
    </h1>
  );
}

function BotaoModelo({ children, contorno = false }: { children: React.ReactNode; contorno?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold ${
        contorno
          ? "border-[1.5px] border-[color-mix(in_srgb,var(--m-texto)_25%,transparent)]"
          : "bg-[var(--m-destaque)] text-[var(--m-texto-destaque)]"
      }`}
    >
      {children}
    </span>
  );
}

function Nav({ modelo }: { modelo: Modelo }) {
  const Logo = icones[modelo.negocio.icone];
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <span className="flex items-center gap-2.5 font-semibold" style={{ fontFamily: "var(--m-fonte)" }}>
        <span className="grid size-9 place-items-center rounded-xl bg-[var(--m-destaque)] text-[var(--m-texto-destaque)]">
          <Logo className="size-5" />
        </span>
        <span className="text-lg">{modelo.negocio.nome}</span>
      </span>
      <span className="hidden items-center gap-8 text-sm opacity-75 @3xl:flex">
        <span>Serviços</span>
        <span>Sobre</span>
        <span>Contato</span>
      </span>
      <span className="hidden rounded-full bg-[var(--m-destaque)] px-5 py-2.5 text-sm font-semibold text-[var(--m-texto-destaque)] @xl:inline-flex">
        {modelo.negocio.cta}
      </span>
    </nav>
  );
}

function HeroDividido({ modelo }: { modelo: Modelo }) {
  const { negocio } = modelo;
  const Grande = icones[negocio.icone];
  const S1 = icones[negocio.servicos[1].icone];
  return (
    <header className="min-h-[800px]">
      <Nav modelo={modelo} />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-10 pb-20 @3xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--m-suave)] px-4 py-1.5 text-sm font-medium">
            <Star className="size-4 fill-[var(--m-destaque)] text-[var(--m-destaque)]" /> {modelo.segmento}
          </span>
          <Titulo className="mt-6 text-[clamp(2.6rem,5.5cqw,4.6rem)]">{negocio.chamada}</Titulo>
          <p className="mt-6 max-w-lg text-lg opacity-75">{negocio.subtitulo}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BotaoModelo>{negocio.cta}</BotaoModelo>
            <BotaoModelo contorno>Ver serviços</BotaoModelo>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] bg-[var(--m-suave)]">
            <div className="absolute -top-16 -right-16 size-72 rounded-full bg-[var(--m-destaque)] opacity-25 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[linear-gradient(to_top,color-mix(in_srgb,var(--m-destaque)_30%,transparent),transparent)]" />
            <Grande className="absolute top-1/2 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 text-[var(--m-destaque)]" strokeWidth={1.1} />
          </div>
          <div className="absolute top-10 -left-8 flex items-center gap-3 rounded-2xl bg-[var(--m-cartao)] px-5 py-4 shadow-xl">
            <span className="grid size-10 place-items-center rounded-xl bg-[var(--m-suave)] text-[var(--m-destaque)]">
              <S1 className="size-5" />
            </span>
            <span className="text-sm">
              <span className="block font-semibold">{negocio.servicos[1].titulo}</span>
              <span className="opacity-60">e muito mais</span>
            </span>
          </div>
          <div className="absolute -right-4 bottom-12 rounded-2xl bg-[var(--m-cartao)] px-5 py-4 shadow-xl">
            <div className="text-2xl font-extrabold" style={{ fontFamily: "var(--m-fonte)" }}>
              {negocio.numeros[2][0]}
            </div>
            <div className="text-sm opacity-60">{negocio.numeros[2][1]}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroCentro({ modelo }: { modelo: Modelo }) {
  const { negocio } = modelo;
  return (
    <header className="min-h-[800px]">
      <Nav modelo={modelo} />
      <div className="mx-auto max-w-5xl px-6 pt-14 text-center">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase opacity-60">{modelo.segmento}</span>
        <Titulo className="mx-auto mt-5 max-w-4xl text-[clamp(2.8rem,6.5cqw,5.6rem)]">{negocio.chamada}</Titulo>
        <p className="mx-auto mt-6 max-w-xl text-lg opacity-75">{negocio.subtitulo}</p>
        <div className="mt-9 flex justify-center gap-3">
          <BotaoModelo>{negocio.cta}</BotaoModelo>
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-3 gap-4 px-6 pb-16">
        {negocio.servicos.map((s, i) => {
          const I = icones[s.icone];
          return (
            <div
              key={s.titulo}
              className={`relative flex h-36 flex-col justify-between overflow-hidden rounded-[22px] p-4 text-left @xl:h-56 @xl:rounded-[28px] @xl:p-6 ${
                i === 1 ? "bg-[var(--m-destaque)] text-[var(--m-texto-destaque)]" : "bg-[var(--m-suave)]"
              }`}
            >
              <I className="size-9" strokeWidth={1.5} />
              <div className="absolute -right-6 -bottom-6 size-16 rounded-full bg-current opacity-10 @xl:size-32" />
              <span className="text-sm font-semibold @xl:text-lg" style={{ fontFamily: "var(--m-fonte)" }}>
                {s.titulo}
              </span>
            </div>
          );
        })}
      </div>
    </header>
  );
}

function HeroCinema({ modelo }: { modelo: Modelo }) {
  const { negocio } = modelo;
  const Grande = icones[negocio.icone];
  return (
    <header className="relative min-h-[800px] overflow-hidden">
      <div className="absolute top-1/3 right-[-10%] size-[700px] rounded-full bg-[radial-gradient(circle,var(--m-destaque)_0%,transparent_60%)] opacity-35" />
      <Grande
        className="absolute top-28 right-10 size-[420px] text-[var(--m-destaque)] opacity-15"
        strokeWidth={0.6}
      />
      <div className="relative">
        <Nav modelo={modelo} />
        <div className="mx-auto max-w-6xl px-6 pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--m-texto)_20%,transparent)] px-4 py-1.5 text-sm">
            <span className="size-2 rounded-full bg-[var(--m-destaque)]" /> {modelo.segmento}
          </span>
          <Titulo className="mt-6 max-w-4xl text-[clamp(3rem,8cqw,7rem)] uppercase">
            {negocio.chamada}
          </Titulo>
          <p className="mt-6 max-w-lg text-lg opacity-70">{negocio.subtitulo}</p>
          <div className="mt-9 flex gap-3">
            <BotaoModelo>{negocio.cta}</BotaoModelo>
            <BotaoModelo contorno>Saiba mais</BotaoModelo>
          </div>
        </div>
        <div className="mt-20 flex gap-10 overflow-hidden border-y border-[color-mix(in_srgb,var(--m-texto)_12%,transparent)] py-5 text-2xl font-extrabold whitespace-nowrap uppercase opacity-80" style={{ fontFamily: "var(--m-fonte)" }}>
          {[...negocio.servicos, ...negocio.servicos, ...negocio.servicos].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s.titulo} <span className="text-[var(--m-destaque)]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

function Servicos({ modelo }: { modelo: Modelo }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 style={{ fontFamily: "var(--m-fonte)" }} className="max-w-xl text-4xl font-extrabold tracking-tight">
        O que fazemos por você
      </h2>
      <div className="mt-12 grid gap-5 @3xl:grid-cols-3">
        {modelo.negocio.servicos.map((s) => {
          const I = icones[s.icone];
          return (
            <div key={s.titulo} className="rounded-3xl bg-[var(--m-cartao)] p-7 shadow-[0_1px_0_color-mix(in_srgb,var(--m-texto)_8%,transparent)]">
              <span className="grid size-12 place-items-center rounded-2xl bg-[var(--m-suave)] text-[var(--m-destaque)]">
                <I className="size-6" />
              </span>
              <h3 style={{ fontFamily: "var(--m-fonte)" }} className="mt-6 text-xl font-bold">
                {s.titulo}
              </h3>
              <p className="mt-2 opacity-70">{s.texto}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Sobre({ modelo }: { modelo: Modelo }) {
  const { negocio } = modelo;
  return (
    <section className="bg-[var(--m-suave)] py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 @3xl:grid-cols-2">
        <div>
          <h2 style={{ fontFamily: "var(--m-fonte)" }} className="text-4xl font-extrabold tracking-tight">
            Sobre {negocio.nome}
          </h2>
          <p className="mt-5 text-lg opacity-75">{negocio.sobre}</p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {negocio.numeros.map(([n, t]) => (
              <div key={t}>
                <div style={{ fontFamily: "var(--m-fonte)" }} className="text-3xl font-extrabold text-[var(--m-destaque)]">
                  {n}
                </div>
                <div className="text-sm opacity-65">{t}</div>
              </div>
            ))}
          </div>
        </div>
        <figure className="self-center rounded-3xl bg-[var(--m-cartao)] p-8">
          <Quote className="size-8 text-[var(--m-destaque)]" />
          <blockquote style={{ fontFamily: "var(--m-fonte)" }} className="mt-4 text-2xl leading-snug font-semibold">
            “{negocio.depoimento.texto}”
          </blockquote>
          <figcaption className="mt-5 text-sm opacity-60">{negocio.depoimento.nome}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Oferta({ modelo }: { modelo: Modelo }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <span className="text-sm font-semibold tracking-[0.2em] text-[var(--m-destaque)] uppercase">Condição especial</span>
      <h2 style={{ fontFamily: "var(--m-fonte)" }} className="mt-4 text-4xl font-extrabold tracking-tight">
        Primeira visita com 20% de desconto
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-lg opacity-75">
        Válido para novos clientes que agendarem pelo site esta semana.
      </p>
      <div className="mt-8">
        <BotaoModelo>{modelo.negocio.cta}</BotaoModelo>
      </div>
    </section>
  );
}

function Contato({ modelo }: { modelo: Modelo }) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl rounded-[36px] bg-[var(--m-destaque)] px-8 py-16 text-center text-[var(--m-texto-destaque)]">
        <h2 style={{ fontFamily: "var(--m-fonte)" }} className="text-4xl font-extrabold tracking-tight">
          Vamos conversar?
        </h2>
        <p className="mt-3 text-lg opacity-80">Resposta rápida pelo WhatsApp.</p>
        <span className="mt-8 inline-flex rounded-full bg-[var(--m-texto-destaque)] px-6 py-3.5 font-semibold text-[var(--m-destaque)]">
          {modelo.negocio.cta}
        </span>
      </div>
    </section>
  );
}
