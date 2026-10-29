"use client";

import { useEffect } from "react";
import { Printer } from "lucide-react";
import { linkWhatsApp } from "@/lib/config";
import { evento } from "@/lib/rastreio";
import { WhatsAppIcon } from "../ui";

export function ContarVisualizacao() {
  useEffect(() => evento("proposta"), []);
  return null;
}

export function AcoesProposta({ link, cliente, negocio, total }: { link: string; cliente: string; negocio: string; total: string }) {
  const mensagem = `Oi! Sou ${cliente}${negocio ? `, da ${negocio}` : ""}. Li a proposta de ${total} e quero aprovar para começar.\n\n${link}`;
  return (
    <section className="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
      <a
        href={linkWhatsApp(mensagem)}
        target="_blank"
        rel="noopener"
        className="flex min-h-14 flex-1 items-center justify-center gap-2.5 rounded-full bg-brand px-6 text-lg font-semibold text-white shadow-[0_12px_28px_-12px] shadow-brand transition hover:-translate-y-0.5 hover:bg-brand-dark"
      >
        <WhatsAppIcon /> Aprovar proposta
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex min-h-14 items-center justify-center gap-2 rounded-full border-[1.5px] border-line px-6 font-semibold transition hover:border-ink"
      >
        <Printer className="size-5" /> Salvar em PDF
      </button>
    </section>
  );
}
