import { Calculadora } from "@/components/calculadora";
import { Duvidas } from "@/components/faq";
import { ChamadaFinal, ContatoFixo, Rodape } from "@/components/final";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Depoimentos, Portfolio, Sobre } from "@/components/prova";
import { ComoFunciona, Garantia, Incluso, Numeros, PorQue } from "@/components/secoes";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Numeros />
        <PorQue />
        <Incluso />
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
