import {
  FileText,
  Globe,
  HandHeart,
  MessageCircle,
  PenLine,
  Search,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { Reveal } from "./reveal";
import { Eyebrow, Titulo } from "./ui";

export function Numeros() {
  const itens = [
    ["48h", "primeira versão"],
    ["7 dias", "site no ar"],
    ["R$ 997", "preço fechado"],
    ["100%", "seu: domínio e site"],
  ];
  return (
    <div className="border-y border-line bg-bg-alt">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 text-center md:grid-cols-4">
        {itens.map(([n, t]) => (
          <div key={t}>
            <div className="font-display text-3xl font-extrabold text-forest">{n}</div>
            <div className="text-sm text-ink-soft">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PorQue() {
  const cards = [
    { icone: Search, titulo: "Aparece no Google", texto: "Seu negócio passa a ser encontrado por quem já está procurando o que você vende." },
    { icone: HandHeart, titulo: "Passa confiança", texto: "Endereço próprio e página profissional mostram que você leva o negócio a sério." },
    { icone: MessageCircle, titulo: "Vira conversa", texto: "Cada página termina num botão de WhatsApp. O visitante vira contato em um clique." },
  ];
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-white md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 size-[520px] rounded-full bg-[radial-gradient(circle,var(--color-brand)_0%,transparent_65%)] opacity-40 blur-2xl"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow claro>Por que ter um site</Eyebrow>
          <Titulo className="max-w-3xl">
            Quem procura no Google e não acha você, <span className="text-lime">acha o concorrente.</span>
          </Titulo>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Instagram ajuda, mas não substitui um endereço próprio. Um site bem feito passa confiança, aparece nas
            buscas e leva o cliente direto para o seu WhatsApp.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.titulo} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-forest-2 p-7 transition hover:border-lime/40">
                <c.icone className="mb-6 size-8 text-lime" strokeWidth={1.75} />
                <h3 className="font-display text-xl font-semibold">{c.titulo}</h3>
                <p className="mt-2 text-white/65">{c.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Incluso() {
  const itens = [
    { icone: FileText, titulo: "Até 5 páginas", texto: "Início, sobre, serviços, contato e mais uma. Ou uma landing page única, se for para anúncio." },
    { icone: Smartphone, titulo: "Feito para celular", texto: "A maioria dos seus clientes vai abrir no celular. O site é pensado primeiro para essa tela." },
    { icone: PenLine, titulo: "Textos prontos", texto: "Você não precisa escrever nada. Eu monto os textos a partir da nossa conversa." },
    { icone: MessageCircle, titulo: "Botão de WhatsApp", texto: "Em todas as páginas, com mensagem pronta para o cliente só apertar enviar." },
    { icone: Globe, titulo: "Domínio .com.br", texto: "Registrado no seu nome ou CNPJ, com hospedagem do primeiro ano inclusa." },
    { icone: Zap, titulo: "Rápido e seguro", texto: "Carrega rápido, tem cadeado de segurança (HTTPS) e configuração básica para o Google." },
  ];
  return (
    <section id="incluso" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Tudo no pacote de R$ 997</Eyebrow>
          <Titulo>O que você recebe</Titulo>
          <p className="mt-5 text-lg text-ink-soft">Sem mensalidade escondida e sem você precisar mexer em nada técnico.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((it, i) => (
            <Reveal key={it.titulo} delay={(i % 3) * 0.07}>
              <div className="group h-full rounded-3xl border border-line bg-card p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(10,42,28,0.35)]">
                <span className="mb-6 grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                  <it.icone className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-xl font-semibold">{it.titulo}</h3>
                <p className="mt-2 text-ink-soft">{it.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComoFunciona() {
  const passos = [
    { quando: "Dia 1", titulo: "Conversa no WhatsApp", texto: "Você me conta sobre o negócio e os serviços, e manda fotos e logo, se tiver." },
    { quando: "Dia 1", titulo: "Primeira metade", texto: "Você paga 50% para eu começar, no Pix ou no cartão." },
    { quando: "Até 48h", titulo: "Primeira versão pronta", texto: "Te mando o link para ver no celular. Você pede os ajustes que quiser." },
    { quando: "Até 7 dias", titulo: "Site no ar", texto: "Ajustes feitos, domínio configurado e site publicado. Aí você paga a segunda metade." },
  ];
  return (
    <section id="como-funciona" className="bg-bg-alt py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Simples assim</Eyebrow>
          <Titulo>Do primeiro “oi” ao site no ar</Titulo>
        </Reveal>
        <div className="relative mt-16 grid gap-6 md:grid-cols-4 md:gap-5">
          <div aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 bg-gradient-to-r from-brand via-brand to-lime md:block" />
          {passos.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 0.1}>
              <div className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-4 border-bg-alt bg-forest font-display text-xl font-extrabold text-lime">
                  {i + 1}
                </span>
                <div>
                  <span className="text-xs font-semibold tracking-wider text-brand uppercase">{p.quando}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold">{p.titulo}</h3>
                  <p className="mt-1.5 text-[15px] text-ink-soft">{p.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Garantia() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="grid items-center gap-8 rounded-[32px] border-2 border-dashed border-brand/40 bg-brand-soft p-8 text-center md:grid-cols-[auto_1fr] md:p-12 md:text-left">
            <div className="mx-auto grid size-32 rotate-[-8deg] place-items-center rounded-full bg-brand text-white shadow-lg">
              <div className="text-center">
                <ShieldCheck className="mx-auto size-8" />
                <div className="mt-1 font-display text-sm leading-tight font-extrabold">
                  Risco
                  <br />
                  pela metade
                </div>
              </div>
            </div>
            <div>
              <Titulo>Não gostou da primeira versão? Não paga o resto.</Titulo>
              <p className="mt-4 max-w-2xl text-lg text-ink-soft">
                Se em 48 horas a primeira versão não te agradar, você não paga a segunda metade e fica com o que já viu.
                Simples e justo para os dois lados.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
