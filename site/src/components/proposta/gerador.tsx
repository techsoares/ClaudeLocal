"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { bases, extras, total, type Base, type Extra } from "@/lib/catalogo";
import { reais } from "@/lib/config";
import { modelos } from "@/lib/modelos";
import { WhatsAppIcon } from "../ui";

const CHAVE_LOCAL = "chave-admin";
const campo = "min-h-12 w-full rounded-xl border-2 border-line bg-card px-4 outline-none transition focus:border-brand";

function Campo({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold">
      {rotulo}
      {children}
    </label>
  );
}

export function GeradorProposta() {
  const [chave, setChave] = useState("");
  const [cliente, setCliente] = useState("");
  const [negocio, setNegocio] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [modelo, setModelo] = useState("");
  const [base, setBase] = useState<Base>("site");
  const [escolhidos, setEscolhidos] = useState<Extra[]>([]);
  const [desconto, setDesconto] = useState(0);
  const [dias, setDias] = useState(7);
  const [observacao, setObservacao] = useState("");
  const [link, setLink] = useState("");
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // chave lembrada neste navegador; se digitar outra, vale a digitada
  const salva = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return localStorage.getItem(CHAVE_LOCAL) ?? "";
      } catch {
        return "";
      }
    },
    () => "",
  );
  const chaveUsada = chave || salva;

  const gerar = async () => {
    setErro("");
    setLink("");
    setEnviando(true);
    try {
      localStorage.setItem(CHAVE_LOCAL, chaveUsada);
    } catch {}
    const validade = new Date();
    validade.setDate(validade.getDate() + dias);
    const r = await fetch("/api/proposta", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-chave": chaveUsada },
      body: JSON.stringify({
        cliente,
        negocio,
        objetivo,
        modelo,
        base,
        extras: escolhidos,
        desconto,
        observacao,
        validade: validade.toISOString().slice(0, 10),
      }),
    }).catch(() => null);
    const json = r ? await r.json().catch(() => null) : null;
    setEnviando(false);
    if (json?.ok) setLink(json.link);
    else setErro(json?.erro ?? "Não consegui gerar. Confira a conexão.");
  };

  const copiar = async () => {
    await navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const mensagemCliente = `Oi, ${cliente.split(" ")[0]}! Preparei a proposta do site${negocio ? ` da ${negocio}` : ""}. Dá uma olhada e me diz o que achou:\n\n${link}`;

  return (
    <div className="mt-10 grid gap-6">
      <Campo rotulo="Chave de acesso (ADMIN_CHAVE)">
        <input
          type="password"
          value={chave}
          onChange={(e) => setChave(e.target.value)}
          placeholder={salva ? "Chave salva neste navegador" : ""}
          className={campo}
          autoComplete="off"
        />
      </Campo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo rotulo="Nome do cliente *">
          <input value={cliente} onChange={(e) => setCliente(e.target.value)} className={campo} />
        </Campo>
        <Campo rotulo="Negócio">
          <input value={negocio} onChange={(e) => setNegocio(e.target.value)} className={campo} placeholder="Ex.: Clínica Sorriso" />
        </Campo>
      </div>
      <Campo rotulo="Objetivo do cliente">
        <input value={objetivo} onChange={(e) => setObjetivo(e.target.value)} className={campo} placeholder="Ex.: receber mais agendamentos pelo WhatsApp" />
      </Campo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo rotulo="Tipo">
          <select value={base} onChange={(e) => setBase(e.target.value as Base)} className={campo}>
            {Object.entries(bases).map(([id, b]) => (
              <option key={id} value={id}>
                {b.titulo}
              </option>
            ))}
          </select>
        </Campo>
        <Campo rotulo="Modelo de partida">
          <select value={modelo} onChange={(e) => setModelo(e.target.value)} className={campo}>
            <option value="">Nenhum (do zero)</option>
            {modelos.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.nome} · {m.segmento}
              </option>
            ))}
          </select>
        </Campo>
      </div>
      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-semibold">Extras</legend>
        {(Object.keys(extras) as Extra[]).map((id) => (
          <label key={id} className="flex items-center gap-3 rounded-xl border-2 border-line bg-card px-4 py-3">
            <input
              type="checkbox"
              checked={escolhidos.includes(id)}
              onChange={() => setEscolhidos((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))}
              className="size-4 accent-[var(--color-brand)]"
            />
            <span className="flex-1">{extras[id].titulo}</span>
            <span className="font-semibold">+ {reais(extras[id].valor)}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo rotulo="Desconto (R$)">
          <input type="number" min={0} step={10} value={desconto} onChange={(e) => setDesconto(Number(e.target.value))} className={campo} />
        </Campo>
        <Campo rotulo="Validade (dias)">
          <input type="number" min={1} max={60} value={dias} onChange={(e) => setDias(Number(e.target.value))} className={campo} />
        </Campo>
      </div>
      <Campo rotulo="Observações (aparecem para o cliente)">
        <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} rows={3} className={`${campo} py-3`} />
      </Campo>

      <div className="flex items-center justify-between rounded-2xl bg-forest p-5 text-white">
        <span className="text-white/70">Total da proposta</span>
        <span className="font-display text-3xl font-extrabold">{reais(total(escolhidos, desconto))}</span>
      </div>

      <button
        type="button"
        onClick={gerar}
        disabled={!cliente || !chaveUsada || enviando}
        className="min-h-14 rounded-full bg-brand text-lg font-semibold text-white transition hover:bg-brand-dark disabled:opacity-50"
      >
        {enviando ? "Gerando…" : "Gerar link da proposta"}
      </button>
      {erro && <p className="text-center font-semibold text-red-700">{erro}</p>}

      {link && (
        <div className="grid gap-3 rounded-2xl border-2 border-brand bg-brand-soft p-5">
          <div className="text-sm font-semibold">Link pronto</div>
          <div className="truncate rounded-lg bg-card px-3 py-2 font-mono text-xs">{link}</div>
          <div className="grid gap-2 sm:grid-cols-3">
            <button type="button" onClick={copiar} className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-card font-semibold">
              {copiado ? <Check className="size-4" /> : <Copy className="size-4" />} {copiado ? "Copiado" : "Copiar"}
            </button>
            <a href={link} target="_blank" rel="noopener" className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-card font-semibold">
              <ExternalLink className="size-4" /> Abrir
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(mensagemCliente)}`}
              target="_blank"
              rel="noopener"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white"
            >
              <WhatsAppIcon className="size-4" /> Enviar
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
