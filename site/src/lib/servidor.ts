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

export function linkProposta(p: Proposta, pagina: "proposta" | "resultado" = "proposta") {
  const codigo = codificar(p);
  return `${siteUrl}/${pagina}?p=${codigo}&a=${assinar(codigo)}`;
}

// Senha das telas internas (gerador de propostas e exportação de logo). Defina ADMIN_CHAVE na Vercel.
export function chaveAdminConfere(chave: string | null) {
  const certa = process.env.ADMIN_CHAVE;
  if (!certa || !chave) return false;
  const a = Buffer.from(certa);
  const b = Buffer.from(chave);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Envia um aviso para LEAD_WEBHOOK_URL (planilha, n8n, CRM). Nunca derruba a requisição se falhar.
export async function notificar(dados: Record<string, unknown>) {
  const corpo = { recebido_em: new Date().toISOString(), ...dados };
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.log("Aviso (LEAD_WEBHOOK_URL não configurado):", corpo);
    return;
  }
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
      signal: AbortSignal.timeout(5000),
    });
  } catch (e) {
    // fica no log da Vercel para não se perder
    console.error("Falha ao enviar aviso para o webhook", e, corpo);
  }
}
