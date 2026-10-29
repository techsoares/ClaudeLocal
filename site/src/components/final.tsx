"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { config, linkWhatsApp } from "@/lib/config";
import { Reveal } from "./reveal";
import { Botao, Titulo, WhatsAppIcon } from "./ui";

export function ChamadaFinal() {
  return (
    <section className="px-5 py-20 md:py-28">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-forest px-6 py-20 text-center text-white md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-brand)_0%,transparent_65%)] opacity-60"
          />
          <div className="relative">
            <Titulo className="mx-auto max-w-3xl">
              Daqui a 7 dias seu negócio pode estar <span className="text-lime">no Google.</span>
            </Titulo>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Me chama no WhatsApp, me conta sobre o seu negócio e em 48 horas você vê a primeira versão.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Botao mensagem="Oi! Quero começar meu site." variante="lima">
                <WhatsAppIcon /> Chamar no WhatsApp
              </Botao>
              <Botao href="/#orcamento" variante="claro">
                Simular orçamento
              </Botao>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="border-t border-line pt-10 pb-28 text-sm text-ink-soft md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5">
        <div>
          © {config.marca} · {config.cidade}
        </div>
        <div className="flex flex-wrap gap-5">
          <a href={linkWhatsApp("Oi! Vim pelo seu site.")} target="_blank" rel="noopener" className="hover:text-ink">
            WhatsApp {config.whatsappVisivel}
          </a>
          {config.email && (
            <a href={`mailto:${config.email}`} className="hover:text-ink">
              {config.email}
            </a>
          )}
          {config.instagram && (
            <a href={config.instagram} target="_blank" rel="noopener" className="hover:text-ink">
              Instagram
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

// Botão flutuante no desktop e barra fixa no celular, que aparecem depois do topo.
export function ContatoFixo() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = linkWhatsApp("Oi! Vim pelo seu site.");
  return (
    <AnimatePresence>
      {visivel && (
        <>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 p-3 backdrop-blur-md md:hidden"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener"
              className="flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-brand font-semibold text-white"
            >
              <WhatsAppIcon /> Quero meu site por R$ 997
            </a>
          </motion.div>
          <motion.a
            href={href}
            target="_blank"
            rel="noopener"
            aria-label="Falar no WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            className="fixed right-6 bottom-6 z-40 hidden size-16 place-items-center rounded-full bg-wa text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.8)] md:grid"
          >
            <WhatsAppIcon className="size-8" />
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
