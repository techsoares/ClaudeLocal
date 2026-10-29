import { ehBase, ehExtra, type Base, type Extra } from "./catalogo";
import { modeloPorSlug } from "./modelos";

// Dados de uma proposta. Vão no link (codificados) e são assinados pelo servidor,
// para ninguém conseguir editar o link e inventar um desconto.
export type Proposta = {
  cliente: string;
  negocio: string;
  segmento?: string;
  objetivo?: string;
  modelo?: string; // slug de um modelo
  base: Base;
  extras: Extra[];
  desconto: number; // em reais
  observacao?: string;
  emitida: string; // AAAA-MM-DD
  validade: string; // AAAA-MM-DD
};

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const dataValida = (v: unknown) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);

export function hoje(diasAFrente = 0) {
  const d = new Date();
  d.setDate(d.getDate() + diasAFrente);
  return d.toISOString().slice(0, 10);
}

// Limpa qualquer entrada (de formulário ou do link) para o formato de proposta.
export function normalizar(dados: Record<string, unknown>): Proposta | null {
  const cliente = texto(dados.cliente, 80);
  const negocio = texto(dados.negocio, 80);
  if (!cliente) return null;
  const modelo = texto(dados.modelo, 40);
  const extras = Array.isArray(dados.extras) ? [...new Set(dados.extras.filter(ehExtra))] : [];
  const desconto = Math.max(0, Math.min(Number(dados.desconto) || 0, 5000));
  return {
    cliente,
    negocio,
    segmento: texto(dados.segmento, 60) || undefined,
    objetivo: texto(dados.objetivo, 80) || undefined,
    modelo: modelo && modeloPorSlug(modelo) ? modelo : undefined,
    base: ehBase(dados.base) ? dados.base : "site",
    extras,
    desconto: Math.round(desconto * 100) / 100,
    observacao: texto(dados.observacao, 600) || undefined,
    emitida: dataValida(dados.emitida) ? (dados.emitida as string) : hoje(),
    validade: dataValida(dados.validade) ? (dados.validade as string) : hoje(7),
  };
}

export function codificar(p: Proposta) {
  return Buffer.from(JSON.stringify(p), "utf8").toString("base64url");
}

export function decodificar(codigo: string): Proposta | null {
  try {
    return normalizar(JSON.parse(Buffer.from(codigo, "base64url").toString("utf8")));
  } catch {
    return null;
  }
}

export function formatarData(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}
