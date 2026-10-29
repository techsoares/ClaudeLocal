import { asaasConfigurado, criarAssinatura, criarCobranca } from "@/lib/asaas";
import { metades, planoMensal, total } from "@/lib/catalogo";
import { documentoValido } from "@/lib/documento";
import { decodificar, hoje } from "@/lib/proposta";
import { assinaturaConfere, notificar } from "@/lib/servidor";

// Cria a cobrança no Asaas e devolve o link de pagamento.
// O valor é sempre calculado aqui no servidor (a partir da proposta assinada ou do plano), nunca vem do navegador.
export async function POST(request: Request) {
  if (!asaasConfigurado())
    return Response.json({ ok: false, erro: "Pagamento online ainda não está ativo. Fale comigo no WhatsApp." }, { status: 503 });

  let c: Record<string, unknown>;
  try {
    c = await request.json();
  } catch {
    return Response.json({ ok: false, erro: "Formato inválido." }, { status: 400 });
  }
  const texto = (v: unknown, max = 120) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const nome = texto(c.nome, 100);
  const documento = texto(c.documento, 20);
  const email = texto(c.email, 120);
  const celular = texto(c.celular, 20);
  if (nome.length < 3) return Response.json({ ok: false, erro: "Informe seu nome completo." }, { status: 400 });
  if (!documentoValido(documento)) return Response.json({ ok: false, erro: "CPF ou CNPJ inválido." }, { status: 400 });
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return Response.json({ ok: false, erro: "E-mail inválido." }, { status: 400 });

  try {
    if (c.tipo === "entrada") {
      const codigo = texto(c.p, 4000);
      const assinatura = texto(c.a, 60);
      const proposta = decodificar(codigo);
      if (!proposta || !assinaturaConfere(codigo, assinatura))
        return Response.json({ ok: false, erro: "Proposta não confere. Peça o link original no WhatsApp." }, { status: 400 });
      if (proposta.validade < hoje())
        return Response.json({ ok: false, erro: "Esta proposta venceu. Me chama no WhatsApp para renovar." }, { status: 400 });
      const [entrada] = metades(total(proposta.extras, proposta.desconto));
      const descricao = `Entrada (50%) do site${proposta.negocio ? ` - ${proposta.negocio}` : ""}`;
      const url = await criarCobranca({ nome, documento, email, celular, referencia: `proposta:${assinatura}` }, entrada, descricao);
      await notificar({ tipo: "checkout", origem: "proposta", nome, negocio: proposta.negocio, valor: entrada, link: url });
      return Response.json({ ok: true, url });
    }

    if (c.tipo === "assinatura") {
      const plano = planoMensal(c.plano);
      if (!plano) return Response.json({ ok: false, erro: "Plano não encontrado." }, { status: 400 });
      const url = await criarAssinatura({ nome, documento, email, celular, referencia: `plano:${plano.id}` }, plano.valor, `Plano ${plano.nome} (mensal)`);
      await notificar({ tipo: "checkout", origem: "assinatura", nome, plano: plano.nome, valor: plano.valor, link: url });
      return Response.json({ ok: true, url });
    }

    return Response.json({ ok: false, erro: "Tipo de pagamento inválido." }, { status: 400 });
  } catch (e) {
    console.error("Erro no Asaas", e);
    return Response.json(
      { ok: false, erro: `Não consegui gerar o pagamento (${e instanceof Error ? e.message : "erro"}). Fale comigo no WhatsApp.` },
      { status: 502 },
    );
  }
}
