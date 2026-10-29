"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, Clock, Globe } from "lucide-react";
import { Botao, WhatsAppIcon } from "./ui";

const entrada = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const reduzir = useReducedMotion();
  const anim = (delay: number) => (reduzir ? {} : entrada(delay));

  return (
    <section className="relative overflow-hidden">
      {/* brilho de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full bg-[radial-gradient(circle,var(--color-lime)_0%,transparent_65%)] opacity-40 blur-2xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-10 pb-20 md:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
        <div>
          <motion.div {...anim(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-medium text-ink-soft">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Agenda aberta para novos projetos
            </span>
          </motion.div>

          <motion.h1
            {...anim(0.08)}
            className="mt-6 font-display text-[clamp(2.6rem,7vw,4.8rem)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance"
          >
            Seu site profissional{" "}
            <span className="relative whitespace-nowrap text-brand">
              no ar em 7 dias
              <svg aria-hidden viewBox="0 0 300 16" className="absolute -bottom-2 left-0 w-full text-lime" preserveAspectRatio="none">
                <path d="M2 12 C 80 2, 200 2, 298 10" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p {...anim(0.16)} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Você me conta sobre o seu negócio no WhatsApp e eu cuido do resto: textos, design, domínio e publicação.
            Em <strong className="text-ink">48 horas</strong> você já vê a primeira versão.
          </motion.p>

          <motion.div {...anim(0.24)} className="mt-9 flex flex-wrap gap-3">
            <Botao mensagem="Oi! Quero colocar o site do meu negócio no ar.">
              <WhatsAppIcon /> Quero meu site
            </Botao>
            <Botao href="#orcamento" variante="contorno">
              Simular meu orçamento
            </Botao>
          </motion.div>

          <motion.ul {...anim(0.32)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-[15px] text-ink-soft">
            {["Domínio .com.br incluso", "Hospedagem do 1º ano inclusa", "Metade só se você aprovar"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="size-4 text-brand" strokeWidth={3} /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <MockupCelular />
      </div>
    </section>
  );
}

function MockupCelular() {
  const reduzir = useReducedMotion();
  // parallax: o celular desce e gira um pouco enquanto a pessoa rola
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduzir ? 0 : 90]);
  const giro = useTransform(scrollY, [0, 700], [0, reduzir ? 0 : -5]);
  const flutuar = (dur: number, dist = 10) =>
    reduzir ? {} : { animate: { y: [0, -dist, 0] }, transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <motion.div
      initial={reduzir ? false : { opacity: 0, scale: 0.94, rotate: 2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[380px]"
    >
      <motion.div style={{ y, rotate: giro }}>
      {/* celular */}
      <div className="relative mx-auto w-[270px] rounded-[44px] bg-forest p-3 shadow-[0_40px_80px_-30px_rgba(10,42,28,0.6)] sm:w-[290px]">
        <div className="absolute top-5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-forest" />
        <div className="overflow-hidden rounded-[34px] bg-bg">
          {/* site fictício dentro do celular */}
          <div className="bg-forest px-5 pt-12 pb-6 text-white">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-sm font-extrabold">Clínica Sorriso</span>
              <span className="h-1.5 w-5 rounded-full bg-white/60" />
            </div>
            <div className="font-display text-[22px] leading-tight font-extrabold">
              Seu sorriso em boas mãos.
            </div>
            <div className="mt-2 h-2 w-4/5 rounded-full bg-white/25" />
            <div className="mt-1.5 h-2 w-3/5 rounded-full bg-white/25" />
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-wa px-3.5 py-2 text-xs font-semibold text-forest">
              <WhatsAppIcon className="size-3.5" /> Agendar consulta
            </div>
          </div>
          <div className="space-y-3 p-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-sm">
                <div className="size-9 rounded-xl bg-brand-soft" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-2/3 rounded-full bg-ink/15" />
                  <div className="h-2 w-1/2 rounded-full bg-ink/10" />
                </div>
              </div>
            ))}
            <div className="h-24 rounded-2xl bg-gradient-to-br from-brand-soft to-lime/50" />
          </div>
        </div>
      </div>

      {/* selos flutuantes */}
      <motion.div
        {...flutuar(5)}
        className="absolute z-20 top-[40%] -left-2 flex items-center gap-2.5 rounded-2xl border border-line bg-card px-4 py-3 shadow-lg sm:-left-8"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand">
          <Clock className="size-5" />
        </span>
        <div className="text-sm leading-tight">
          <div className="font-semibold">Primeira versão</div>
          <div className="text-ink-soft">em 48 horas</div>
        </div>
      </motion.div>

      <motion.div
        {...flutuar(6, 12)}
        className="absolute z-20 top-6 -right-1 flex items-center gap-2.5 rounded-2xl border border-line bg-card px-4 py-3 shadow-lg sm:-right-6"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-lime text-forest">
          <Globe className="size-5" />
        </span>
        <div className="text-sm leading-tight">
          <div className="font-semibold">seunegocio.com.br</div>
          <div className="text-ink-soft">no seu nome</div>
        </div>
      </motion.div>

      <motion.div
        {...flutuar(7, 8)}
        className="absolute z-20 bottom-6 left-2 rounded-2xl bg-forest px-4 py-3 text-white shadow-lg sm:-left-4"
      >
        <div className="text-xs text-white/60">a partir de</div>
        <div className="font-display text-2xl font-extrabold">R$ 997</div>
        <div className="text-xs font-medium text-lime">preço fechado</div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}
