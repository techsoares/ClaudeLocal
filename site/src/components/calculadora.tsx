"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Check, LayoutTemplate, Newspaper, PanelsTopLeft, ShoppingBag } from "lucide-react";
import { linkWhatsApp, precos, reais } from "@/lib/config";
import { Reveal } from "./reveal";
import { Eyebrow, Titulo, WhatsAppIcon } from "./ui";

const bases = [
  {
    id: "site",
    icone: PanelsTopLeft,
    titulo: "Site institucional",
    texto: "Até 5 páginas apresentando o negócio inteiro.",
  },
  {
    id: "landing",
    icone: LayoutTemplate,
    titulo: "Landing page",
    texto: "Página única focada em uma oferta, ideal para anúncios.",
  },
] as const;

const extras = [
  {
    id: "blog",
    icone: Newspaper,
    titulo: "Blog pronto para publicar",
    valor: precos.blog,
  },
  {
    id: "maior",
    icone: ShoppingBag,
    titulo: "Loja virtual, login, sistema ou 10+ páginas",
    valor: precos.projetoMaior,
  },
] as const;

type Base = (typeof bases)[number]["id"];
type Extra = (typeof extras)[number]["id"];

function ValorAnimado({ valor }: { valor: number }) {
  const reduzir = useReducedMotion();
  const mv = useMotionValue(valor);
  const texto = useTransform(mv, (v) => reais(Math.round(v)));
  useEffect(() => {
    if (reduzir) {
      mv.set(valor);
      return;
    }
    const c = animate(mv, valor, { duration: 0.5, ease: "easeOut" });
    return () => c.stop();
  }, [valor, mv, reduzir]);
  return <motion.span>{texto}</motion.span>;
}

export function Calculadora() {
  const [base, setBase] = useState<Base>("site");
  const [escolhidos, setEscolhidos] = useState<Extra[]>([]);
  const [nome, setNome] = useState("");
  const [negocio, setNegocio] = useState("");

  const total = precos.site + extras.filter((e) => escolhidos.includes(e.id)).reduce((s, e) => s + e.valor, 0);
  const metade = total / 2;
  const alternar = (id: Extra) =>
    setEscolhidos((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]));

  const baseEscolhida = bases.find((b) => b.id === base)!;
  const mensagem = [
    `Oi! Montei meu orçamento no seu site${nome ? `. Meu nome é ${nome.trim()}` : ""}.`,
    negocio ? `Meu negócio: ${negocio.trim()}` : null,
    "",
    `• ${baseEscolhida.titulo} (${reais(precos.site)})`,
    ...extras.filter((e) => escolhidos.includes(e.id)).map((e) => `• ${e.titulo} (+ ${reais(e.valor)})`),
    "",
    `Total: ${reais(total)}`,
    "Podemos começar?",
  ]
    .filter((l) => l !== null)
    .join("\n");

  return (
    <section id="orcamento" className="bg-bg-alt py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Preço fechado, sem surpresa</Eyebrow>
          <Titulo>Monte seu orçamento</Titulo>
          <p className="mt-5 text-lg text-ink-soft">
            Escolha o que você precisa e veja o valor na hora. Depois é só mandar para mim no WhatsApp.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid overflow-hidden rounded-[32px] border border-line bg-card shadow-[0_30px_60px_-40px_rgba(10,42,28,0.45)] lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-6 md:p-10">
              <fieldset>
                <legend className="mb-4 text-sm font-semibold tracking-wide text-ink-soft uppercase">
                  1. O que você precisa?
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {bases.map((b) => {
                    const ativo = base === b.id;
                    return (
                      <label
                        key={b.id}
                        className={`relative cursor-pointer rounded-2xl border-2 p-5 transition ${
                          ativo ? "border-brand bg-brand-soft/60" : "border-line hover:border-ink/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="base"
                          value={b.id}
                          checked={ativo}
                          onChange={() => setBase(b.id)}
                          className="sr-only"
                        />
                        <b.icone className={`mb-3 size-7 ${ativo ? "text-brand" : "text-ink-soft"}`} strokeWidth={1.75} />
                        <div className="font-semibold">{b.titulo}</div>
                        <div className="mt-1 text-sm text-ink-soft">{b.texto}</div>
                        <div className="mt-3 font-display text-lg font-extrabold">{reais(precos.site)}</div>
                        {ativo && (
                          <span className="absolute top-4 right-4 grid size-6 place-items-center rounded-full bg-brand text-white">
                            <Check className="size-4" strokeWidth={3} />
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-9">
                <legend className="mb-4 text-sm font-semibold tracking-wide text-ink-soft uppercase">
                  2. Quer algo a mais? (opcional)
                </legend>
                <div className="grid gap-3">
                  {extras.map((e) => {
                    const ativo = escolhidos.includes(e.id);
                    return (
                      <label
                        key={e.id}
                        className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition ${
                          ativo ? "border-brand bg-brand-soft/60" : "border-line hover:border-ink/30"
                        }`}
                      >
                        <input type="checkbox" checked={ativo} onChange={() => alternar(e.id)} className="sr-only" />
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-md border-2 transition ${
                            ativo ? "border-brand bg-brand text-white" : "border-line"
                          }`}
                        >
                          {ativo && <Check className="size-4" strokeWidth={3} />}
                        </span>
                        <e.icone className="size-5 shrink-0 text-ink-soft" strokeWidth={1.75} />
                        <span className="flex-1 font-medium">{e.titulo}</span>
                        <span className="font-display font-extrabold whitespace-nowrap">+ {reais(e.valor)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-9">
                <legend className="mb-4 text-sm font-semibold tracking-wide text-ink-soft uppercase">
                  3. Sobre você (opcional)
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    aria-label="Seu nome"
                    className="min-h-12 rounded-xl border-2 border-line bg-bg px-4 outline-none transition focus:border-brand"
                  />
                  <input
                    value={negocio}
                    onChange={(e) => setNegocio(e.target.value)}
                    placeholder="Seu negócio (ex.: clínica, loja)"
                    aria-label="Seu negócio"
                    className="min-h-12 rounded-xl border-2 border-line bg-bg px-4 outline-none transition focus:border-brand"
                  />
                </div>
              </fieldset>
            </div>

            <div className="relative flex flex-col justify-between overflow-hidden bg-forest p-6 text-white md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,var(--color-lime)_0%,transparent_70%)] opacity-30"
              />
              <div className="relative">
                <div className="text-sm text-white/60">Seu investimento</div>
                <div className="mt-1 font-display text-5xl font-extrabold tracking-tight md:text-6xl" aria-live="polite">
                  <ValorAnimado valor={total} />
                </div>
                <div className="mt-6 grid gap-3 rounded-2xl bg-white/5 p-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/70">Para começar</span>
                    <span className="font-semibold">
                      <ValorAnimado valor={metade} />
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/70">Quando estiver no ar</span>
                    <span className="font-semibold">
                      <ValorAnimado valor={metade} />
                    </span>
                  </div>
                </div>
                <ul className="mt-6 grid gap-2.5 text-sm text-white/80">
                  {["Pix ou cartão de crédito", "Domínio e hospedagem do 1º ano inclusos", "Primeira versão em 48h"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="size-4 text-lime" strokeWidth={3} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={linkWhatsApp(mensagem)}
                target="_blank"
                rel="noopener"
                className="relative mt-8 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-lime px-6 text-base font-semibold text-forest transition hover:-translate-y-0.5 hover:bg-white"
              >
                <WhatsAppIcon /> Enviar orçamento no WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
