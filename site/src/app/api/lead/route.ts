import { linkProposta } from "@/lib/servidor";
import { normalizar } from "@/lib/proposta";

// Recebe um lead do site (diagnóstico, criador de logo, calculadora) e repassa para
// LEAD_WEBHOOK_URL: uma planilha do Google, n8n, Make, Zapier ou o CRM que você usar.

const texto = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return Response.json({ ok: false, erro: "Formato inválido." }, { status: 400 });
  }

  // Campo escondido: só robô preenche.
  if (texto(corpo.site)) return Response.json({ ok: true });

  const nome = texto(corpo.nome, 80);
  const whatsapp = texto(corpo.whatsapp, 20).replace(/\D/g, "");
  if (nome.length < 2) return Response.json({ ok: false, erro: "Informe seu nome." }, { status: 400 });
  if (whatsapp.length < 10 || whatsapp.length > 13)
    return Response.json({ ok: false, erro: "Informe um WhatsApp com DDD." }, { status: 400 });
  if (corpo.consentimento !== true)
    return Response.json({ ok: false, erro: "É preciso autorizar o contato." }, { status: 400 });

  // Propostas pedidas pelo próprio cliente nunca levam desconto nem observação.
  const proposta =
    corpo.proposta && typeof corpo.proposta === "object"
      ? normalizar({ ...(corpo.proposta as Record<string, unknown>), cliente: nome, desconto: 0, observacao: "" })
      : null;
  const link = proposta ? linkProposta(proposta) : undefined;

  const lead = {
    recebido_em: new Date().toISOString(),
    origem: texto(corpo.origem, 30) || "site",
    nome,
    whatsapp,
    negocio: texto(corpo.negocio, 80),
    respostas: corpo.respostas && typeof corpo.respostas === "object" ? corpo.respostas : {},
    utm: corpo.utm && typeof corpo.utm === "object" ? corpo.utm : {},
    pagina: texto(corpo.pagina, 300),
    proposta: link ?? "",
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(5000),
      });
    } catch (e) {
      // O lead não pode se perder em silêncio: fica no log da Vercel.
      console.error("Falha ao enviar lead para o webhook", e, lead);
    }
  } else {
    console.log("Lead recebido (LEAD_WEBHOOK_URL não configurado):", lead);
  }

  return Response.json({ ok: true, proposta: link });
}
