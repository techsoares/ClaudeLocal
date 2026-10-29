import type { Metadata } from "next";
import { GeradorProposta } from "@/components/proposta/gerador";

export const metadata: Metadata = {
  title: "Gerar proposta",
  robots: { index: false, follow: false },
};

export default function PaginaNovaProposta() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Gerar proposta</h1>
      <p className="mt-2 text-ink-soft">
        Preencha, gere o link e mande para o cliente. O link é assinado: se alguém mudar valores ou desconto, a proposta
        aparece como não verificada.
      </p>
      <GeradorProposta />
    </main>
  );
}
