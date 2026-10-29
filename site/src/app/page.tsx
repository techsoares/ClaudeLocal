import { Calculadora } from "@/components/calculadora";
import { Duvidas } from "@/components/faq";
import { ChamadaFinal, ContatoFixo, Rodape } from "@/components/final";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Miniatura } from "@/components/modelo/miniatura";
import { SiteModelo } from "@/components/modelo/site-modelo";
import { Vitrine } from "@/components/modelo/vitrine";
import { Depoimentos, Portfolio, Sobre } from "@/components/prova";
import { ComoFunciona, Garantia, Incluso, Numeros, PorQue } from "@/components/secoes";
import { modelos } from "@/lib/modelos";

export default function Home() {
  const vitrine = modelos.slice(0, 6).map((m) => ({
    modelo: m,
    previa: (
      <Miniatura>
        <SiteModelo modelo={m} apenasHero />
      </Miniatura>
    ),
  }));

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Numeros />
        <PorQue />
        <Incluso />
        <Vitrine itens={vitrine} total={modelos.length} />
        <ComoFunciona />
        <Garantia />
        <Calculadora />
        <Portfolio />
        <Depoimentos />
        <Sobre />
        <Duvidas />
        <ChamadaFinal />
      </main>
      <Rodape />
      <ContatoFixo />
    </>
  );
}
