"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { config } from "@/lib/config";
import { Botao, WhatsAppIcon } from "./ui";

const links = [
  { href: "#incluso", label: "O que inclui" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#orcamento", label: "Preços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        rolou || aberto ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#" className="font-display text-xl font-extrabold tracking-tight whitespace-nowrap">
          {config.marca}
          <span className="text-brand">.</span>
        </a>

        <nav aria-label="Seções" className="hidden items-center gap-7 text-[15px] text-ink-soft lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Botao mensagem="Oi! Vim pelo seu site e quero um orçamento." className="!min-h-10 !px-5 !py-2 text-sm">
              <WhatsAppIcon className="size-4" /> Pedir orçamento
            </Botao>
          </span>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="grid size-11 place-items-center rounded-full border border-line bg-card lg:hidden"
          >
            {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            aria-label="Seções"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="border-b border-line py-3.5 text-lg font-medium last:border-0"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
