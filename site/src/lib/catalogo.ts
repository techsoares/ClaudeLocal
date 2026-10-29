import { precos } from "./config";

// Itens vendáveis. Calculadora, propostas e diagnóstico usam esta mesma lista,
// então preço muda num lugar só (em config.ts).

export const bases = {
  site: { titulo: "Site institucional", texto: "Até 5 páginas apresentando o negócio inteiro." },
  landing: { titulo: "Landing page", texto: "Página única focada em uma oferta, ideal para anúncios." },
} as const;

export const extras = {
  blog: { titulo: "Blog pronto para publicar", valor: precos.blog },
  maior: { titulo: "Loja virtual, login, sistema ou 10+ páginas", valor: precos.projetoMaior },
  logo: { titulo: "Logo personalizada", valor: precos.logo },
  logoExpress: { titulo: "Logo express (criada no meu criador de logo)", valor: precos.logoExpress },
} as const;

export type Base = keyof typeof bases;
export type Extra = keyof typeof extras;

export const ehBase = (v: unknown): v is Base => typeof v === "string" && v in bases;
export const ehExtra = (v: unknown): v is Extra => typeof v === "string" && v in extras;

export function total(itens: Extra[], desconto = 0) {
  return Math.max(0, precos.site + itens.reduce((s, id) => s + extras[id].valor, 0) - desconto);
}

// Divide o total em duas parcelas que somam exatamente o valor (o centavo que sobra vai na primeira).
export function metades(valor: number): [number, number] {
  const centavos = Math.round(valor * 100);
  const primeira = Math.ceil(centavos / 2);
  return [primeira / 100, (centavos - primeira) / 100];
}
