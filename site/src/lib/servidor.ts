import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { siteUrl } from "./config";
import { codificar, type Proposta } from "./proposta";

// Segredo usado para assinar propostas. Defina PROPOSTA_SEGREDO na Vercel (qualquer texto longo e aleatório).
function segredo() {
  const s = process.env.PROPOSTA_SEGREDO;
  if (s) return s;
  if (process.env.NODE_ENV === "production") throw new Error("Defina PROPOSTA_SEGREDO nas variáveis de ambiente.");
  return "segredo-de-desenvolvimento";
}

export function assinar(codigo: string) {
  return createHmac("sha256", segredo()).update(codigo).digest("base64url").slice(0, 22);
}

export function assinaturaConfere(codigo: string, assinatura: string) {
  const esperado = Buffer.from(assinar(codigo));
  const recebido = Buffer.from(assinatura);
  return esperado.length === recebido.length && timingSafeEqual(esperado, recebido);
}

export function linkProposta(p: Proposta) {
  const codigo = codificar(p);
  return `${siteUrl}/proposta?p=${codigo}&a=${assinar(codigo)}`;
}

// Senha das telas internas (gerador de propostas e exportação de logo). Defina ADMIN_CHAVE na Vercel.
export function chaveAdminConfere(chave: string | null) {
  const certa = process.env.ADMIN_CHAVE;
  if (!certa || !chave) return false;
  const a = Buffer.from(certa);
  const b = Buffer.from(chave);
  return a.length === b.length && timingSafeEqual(a, b);
}
