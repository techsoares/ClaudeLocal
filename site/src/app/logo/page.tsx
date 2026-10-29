import type { Metadata } from "next";
import { Suspense } from "react";
import { ContatoFixo, Rodape } from "@/components/final";
import { Header } from "@/components/header";
import { CriadorLogo } from "@/components/logo/criador";
import { Eyebrow } from "@/components/ui";
import { precos, reais } from "@/lib/config";

export const metadata: Metadata = {
  title: "Crie sua logo grátis em 1 minuto",
  description: `Monte a logo do seu negócio escolhendo ícone, letra e cores. Receba os arquivos por ${reais(precos.logoExpress)} ou peça uma logo personalizada por ${reais(precos.logo)}.`,
  alternates: { canonical: "/logo" },
};

export default function PaginaLogo() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-10 pb-24 md:pt-16">
        <Eyebrow>Criador de logo</Eyebrow>
        <h1 className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[1] font-extrabold tracking-[-0.03em] text-balance">
          Crie a logo do seu negócio <span className="text-brand">em 1 minuto.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft">
          Escolha o ícone, a letra e as cores. Gostou? Receba os arquivos por {reais(precos.logoExpress)}. Quer algo
          único? Eu crio uma logo personalizada por {reais(precos.logo)}.
        </p>
        <div className="mt-12">
          <Suspense fallback={<div className="h-[600px] animate-pulse rounded-[28px] bg-bg-alt" />}>
            <CriadorLogo />
          </Suspense>
        </div>
      </main>
      <Rodape />
      <ContatoFixo />
    </>
  );
}
