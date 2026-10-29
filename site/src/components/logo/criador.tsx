"use client";

import { useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  Camera,
  Car,
  Coffee,
  Crown,
  Download,
  Dumbbell,
  Flame,
  Flower2,
  Gem,
  Heart,
  House,
  Leaf,
  type LucideIcon,
  Music,
  Palette,
  PawPrint,
  Scale,
  Scissors,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  Utensils,
  Wrench,
  Zap,
} from "lucide-react";
import { linkWhatsApp, precos, reais, siteUrl } from "@/lib/config";
import { enviarLead, evento } from "@/lib/rastreio";
import { useIlha } from "../ilha";
import { WhatsAppIcon } from "../ui";

const icones: Record<string, LucideIcon> = {
  sparkles: Sparkles, folha: Leaf, chama: Flame, coracao: Heart, estrela: Star, cafe: Coffee, tesoura: Scissors,
  haltere: Dumbbell, pata: PawPrint, balanca: Scale, casa: House, camera: Camera, musica: Music, joia: Gem,
  coroa: Crown, sol: Sun, raio: Zap, flor: Flower2, sorriso: Smile, talheres: Utensils, carro: Car, chave: Wrench,
  saude: Stethoscope, livro: BookOpen, paleta: Palette,
};

const fontes = {
  bricolage: { rotulo: "Moderna", css: "var(--font-bricolage)", real: "Bricolage Grotesque", peso: 800, google: "Bricolage+Grotesque:wght@800" },
  fraunces: { rotulo: "Elegante", css: "var(--font-fraunces)", real: "Fraunces", peso: 800, google: "Fraunces:wght@800" },
  grotesk: { rotulo: "Tecnológica", css: "var(--font-grotesk)", real: "Space Grotesk", peso: 700, google: "Space+Grotesk:wght@700" },
  inter: { rotulo: "Limpa", css: "var(--font-inter)", real: "Inter", peso: 600, google: "Inter:wght@600" },
} as const;

const paletas = {
  verde: ["#F5F8F2", "#0E1A14", "#138A4B"],
  noite: ["#0F1724", "#F3EEE4", "#C9A45C"],
  rosa: ["#FFF5F3", "#3A1420", "#E2557A"],
  brasa: ["#120D0A", "#FFF4E8", "#FF6A1A"],
  oceano: ["#F4FAFA", "#0B2B2E", "#0E9384"],
  azul: ["#F5F7FC", "#0D1B3E", "#2557D6"],
  lima: ["#0A0B0A", "#F2F5EE", "#C6F432"],
  areia: ["#F3EFE8", "#22201C", "#A0522D"],
} as const;

const layouts = { lado: "Ícone ao lado", topo: "Ícone em cima", selo: "Selo", texto: "Só o nome" } as const;

type Logo = {
  nome: string;
  slogan: string;
  icone: keyof typeof icones;
  fonte: keyof typeof fontes;
  paleta: keyof typeof paletas;
  layout: keyof typeof layouts;
};

const padrao: Logo = { nome: "Seu Negócio", slogan: "", icone: "sparkles", fonte: "bricolage", paleta: "verde", layout: "lado" };

function lerDoLink(c: string | null): Logo {
  if (!c) return padrao;
  try {
    const d = JSON.parse(atob(c.replace(/-/g, "+").replace(/_/g, "/")));
    return {
      nome: String(d.nome ?? padrao.nome).slice(0, 40),
      slogan: String(d.slogan ?? "").slice(0, 60),
      icone: d.icone in icones ? d.icone : padrao.icone,
      fonte: d.fonte in fontes ? d.fonte : padrao.fonte,
      paleta: d.paleta in paletas ? d.paleta : padrao.paleta,
      layout: d.layout in layouts ? d.layout : padrao.layout,
    };
  } catch {
    return padrao;
  }
}

function paraLink(l: Logo) {
  const bytes = new TextEncoder().encode(JSON.stringify(l));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Desenho da logo em SVG (o mesmo que é exportado).
function DesenhoLogo({ l, fundo = true, inverter = false, svgRef }: { l: Logo; fundo?: boolean; inverter?: boolean; svgRef?: React.Ref<SVGSVGElement> }) {
  const [p0, p1, cDestaque] = paletas[l.paleta];
  const [cFundo, cTexto] = inverter ? [p1, p0] : [p0, p1];
  const Icone = icones[l.icone];
  const f = fontes[l.fonte];
  const nome = l.nome.trim() || "Seu Negócio";
  const tam = Math.max(30, Math.min(64, 560 / Math.max(nome.length * 0.6, 1)));
  const fonteTexto = { fontFamily: f.css, fontWeight: f.peso };

  let corpo: ReactNode;
  if (l.layout === "lado") {
    const larguraNome = Math.max(nome.length * tam * 0.58, l.slogan.length * 8.5);
    const x0 = Math.max(20, (640 - (110 + 28 + larguraNome)) / 2);
    corpo = (
      <>
        <rect x={x0} y={105} width={110} height={110} rx={28} fill={cDestaque} />
        <Icone x={x0 + 25} y={130} width={60} height={60} color={cFundo} strokeWidth={2} />
        <text x={x0 + 138} y={l.slogan ? 168 : 160 + tam * 0.35} fill={cTexto} fontSize={tam} style={fonteTexto} letterSpacing={-1}>
          {nome}
        </text>
        {l.slogan && (
          <text x={x0 + 140} y={200} fill={cTexto} opacity={0.65} fontSize={16} style={{ fontFamily: "var(--font-inter)" }}>
            {l.slogan}
          </text>
        )}
      </>
    );
  } else if (l.layout === "topo") {
    corpo = (
      <>
        <Icone x={285} y={50} width={70} height={70} color={cDestaque} strokeWidth={2} />
        <text x={320} y={190} textAnchor="middle" fill={cTexto} fontSize={tam} style={fonteTexto} letterSpacing={-1}>
          {nome}
        </text>
        {l.slogan && (
          <text x={320} y={228} textAnchor="middle" fill={cTexto} opacity={0.65} fontSize={16} letterSpacing={3} style={{ fontFamily: "var(--font-inter)" }}>
            {l.slogan.toUpperCase()}
          </text>
        )}
      </>
    );
  } else if (l.layout === "selo") {
    const t = Math.min(tam, 215 / Math.max(nome.length * 0.6, 1));
    corpo = (
      <>
        <circle cx={320} cy={160} r={130} fill={cDestaque} />
        <circle cx={320} cy={160} r={118} fill="none" stroke={cFundo} strokeWidth={2} strokeDasharray="4 6" />
        <Icone x={290} y={70} width={60} height={60} color={cFundo} strokeWidth={2} />
        <text x={320} y={175} textAnchor="middle" fill={cFundo} fontSize={t} style={fonteTexto}>
          {nome}
        </text>
        {l.slogan && (
          <text x={320} y={210} textAnchor="middle" fill={cFundo} opacity={0.8} fontSize={12} letterSpacing={2} style={{ fontFamily: "var(--font-inter)" }}>
            {l.slogan.toUpperCase().slice(0, 28)}
          </text>
        )}
      </>
    );
  } else {
    corpo = (
      <>
        <text x={320} y={170} textAnchor="middle" fill={cTexto} fontSize={tam * 1.15} style={fonteTexto} letterSpacing={-2}>
          {nome}
          <tspan fill={cDestaque}>.</tspan>
        </text>
        {l.slogan && (
          <text x={320} y={215} textAnchor="middle" fill={cTexto} opacity={0.65} fontSize={16} style={{ fontFamily: "var(--font-inter)" }}>
            {l.slogan}
          </text>
        )}
      </>
    );
  }

  return (
    <svg ref={svgRef} viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full" role="img" aria-label={`Logo ${nome}`}>
      {fundo && <rect width={640} height={320} fill={cFundo} />}
      {corpo}
    </svg>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold tracking-[0.12em] text-ink-soft uppercase">{titulo}</legend>
      {children}
    </fieldset>
  );
}

const campo = "min-h-12 w-full rounded-xl border-2 border-line bg-card px-4 outline-none transition focus:border-brand";

export function CriadorLogo() {
  const params = useSearchParams();
  const [logo, setLogo] = useState<Logo>(() => lerDoLink(params.get("c")));
  const [pedindo, setPedindo] = useState(false);
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [aceite, setAceite] = useState(false);
  const [armadilha, setArmadilha] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");
  const [chave, setChave] = useState("");
  const [liberado, setLiberado] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const { avisar } = useIlha();
  const modoAdmin = params.has("admin");

  const mudar = <K extends keyof Logo>(k: K, v: Logo[K]) => {
    setLogo((a) => ({ ...a, [k]: v }));
    if (k !== "nome" && k !== "slogan") evento("logo", { [k]: v });
  };

  const link = `${siteUrl}/logo?c=${paraLink(logo)}`;
  const [cFundo, , cDestaque] = paletas[logo.paleta];

  const pedir = async () => {
    setErro("");
    const r = await enviarLead({
      origem: "logo",
      nome,
      whatsapp: whatsapp.replace(/\D/g, "").length <= 11 ? `55${whatsapp.replace(/\D/g, "")}` : whatsapp,
      negocio: logo.nome,
      consentimento: aceite,
      site: armadilha,
      respostas: { logo: link },
    });
    if (!r.ok) {
      setErro(r.erro ?? "Não deu certo.");
      return;
    }
    setEnviado(true);
    avisar("Logo reservada!", "Agora é só confirmar no WhatsApp");
  };

  const baixar = () => {
    if (!svg.current) return;
    const f = fontes[logo.fonte];
    const copia = svg.current.cloneNode(true) as SVGSVGElement;
    copia.querySelectorAll("text").forEach((t) => {
      const ehNome = t.style.fontFamily.includes(f.css.slice(4, -1));
      t.style.fontFamily = ehNome ? `'${f.real}', sans-serif` : "'Inter', sans-serif";
    });
    const estilo = document.createElementNS("http://www.w3.org/2000/svg", "style");
    estilo.textContent = `@import url('https://fonts.googleapis.com/css2?family=${f.google}&family=Inter:wght@400&display=swap');`;
    copia.insertBefore(estilo, copia.firstChild);
    const blob = new Blob([new XMLSerializer().serializeToString(copia)], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `logo-${logo.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const conferirChave = async () => {
    const r = await fetch("/api/admin", { method: "POST", headers: { "x-admin-chave": chave } }).catch(() => null);
    setLiberado(Boolean(r?.ok));
    if (!r?.ok) avisar("Chave incorreta");
  };

  const Icone = icones[logo.icone];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      {/* prévia */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-[28px] border border-line shadow-[0_30px_60px_-40px_rgba(10,42,28,0.5)]">
          <DesenhoLogo l={logo} svgRef={svg} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="grid aspect-square place-items-center rounded-2xl border border-line bg-card">
            <div className="grid size-[70%] place-items-center rounded-full" style={{ background: cDestaque }}>
              <Icone className="size-1/2" color={cFundo} strokeWidth={2} />
            </div>
            <span className="sr-only">Foto de perfil</span>
          </div>
          <div className="col-span-2 flex flex-col justify-between rounded-2xl p-4" style={{ background: paletas[logo.paleta][1] }}>
            <div className="w-1/2">
              <DesenhoLogo l={logo} fundo={false} inverter />
            </div>
            <div className="text-[10px] font-medium" style={{ color: cFundo, opacity: 0.7 }}>
              cartão de visita · {logo.slogan || "seu contato aqui"}
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-ink-soft">Prévia no perfil do Instagram e no cartão de visita</p>
      </div>

      {/* controles */}
      <div className="grid gap-7">
        <div className="grid gap-3">
          <input value={logo.nome} maxLength={40} onChange={(e) => mudar("nome", e.target.value)} placeholder="Nome do negócio" aria-label="Nome do negócio" className={campo} />
          <input value={logo.slogan} maxLength={60} onChange={(e) => mudar("slogan", e.target.value)} placeholder="Slogan (opcional)" aria-label="Slogan" className={campo} />
        </div>

        <Grupo titulo="Ícone">
          <div className="grid grid-cols-7 gap-2 sm:grid-cols-9 lg:grid-cols-7">
            {Object.entries(icones).map(([id, I]) => (
              <button
                key={id}
                type="button"
                aria-label={id}
                aria-pressed={logo.icone === id}
                onClick={() => mudar("icone", id)}
                className={`grid aspect-square place-items-center rounded-xl border-2 transition ${logo.icone === id ? "border-brand bg-brand-soft text-brand" : "border-line bg-card hover:border-ink/30"}`}
              >
                <I className="size-5" />
              </button>
            ))}
          </div>
        </Grupo>

        <Grupo titulo="Estilo da letra">
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(fontes) as (keyof typeof fontes)[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={logo.fonte === id}
                onClick={() => mudar("fonte", id)}
                className={`min-h-14 rounded-xl border-2 px-4 text-left transition ${logo.fonte === id ? "border-brand bg-brand-soft" : "border-line bg-card hover:border-ink/30"}`}
              >
                <span className="block text-lg" style={{ fontFamily: fontes[id].css, fontWeight: fontes[id].peso }}>
                  Aa Bb
                </span>
                <span className="text-xs text-ink-soft">{fontes[id].rotulo}</span>
              </button>
            ))}
          </div>
        </Grupo>

        <Grupo titulo="Cores">
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(paletas) as (keyof typeof paletas)[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-label={`Paleta ${id}`}
                aria-pressed={logo.paleta === id}
                onClick={() => mudar("paleta", id)}
                className={`flex h-12 overflow-hidden rounded-xl border-2 transition ${logo.paleta === id ? "border-brand ring-2 ring-brand/30" : "border-line"}`}
              >
                {paletas[id].map((c) => (
                  <span key={c} className="flex-1" style={{ background: c }} />
                ))}
              </button>
            ))}
          </div>
        </Grupo>

        <Grupo titulo="Formato">
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(layouts) as (keyof typeof layouts)[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={logo.layout === id}
                onClick={() => mudar("layout", id)}
                className={`min-h-12 rounded-xl border-2 px-4 text-sm font-semibold transition ${logo.layout === id ? "border-brand bg-brand-soft" : "border-line bg-card hover:border-ink/30"}`}
              >
                {layouts[id]}
              </button>
            ))}
          </div>
        </Grupo>

        <div className="grid gap-3 rounded-[28px] bg-forest p-6 text-white">
          <AnimatePresence mode="wait">
            {!pedindo ? (
              <motion.div key="botoes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-3">
                <button
                  type="button"
                  onClick={() => setPedindo(true)}
                  className="flex min-h-14 items-center justify-between gap-3 rounded-full bg-lime px-6 font-semibold text-forest transition hover:bg-white"
                >
                  Quero essa logo <span className="font-display text-lg font-extrabold">{reais(precos.logoExpress)}</span>
                </button>
                <a
                  href={linkWhatsApp(`Oi! Quero uma logo personalizada feita por você (${reais(precos.logo)}). Comecei esta ideia no criador: ${link}`)}
                  target="_blank"
                  rel="noopener"
                  className="flex min-h-14 items-center justify-between gap-3 rounded-full border border-white/25 px-6 font-semibold transition hover:border-white"
                >
                  Prefiro logo feita por você <span className="font-display text-lg font-extrabold">{reais(precos.logo)}</span>
                </a>
                <p className="text-center text-xs text-white/60">
                  Você recebe os arquivos em alta qualidade (SVG e PNG) pelo WhatsApp.
                </p>
              </motion.div>
            ) : !enviado ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  pedir();
                }}
                className="grid gap-3"
              >
                <div className="font-semibold">Para onde eu mando os arquivos?</div>
                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" autoComplete="name" className={`${campo} text-ink`} />
                <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp com DDD" aria-label="WhatsApp" inputMode="tel" autoComplete="tel" className={`${campo} text-ink`} />
                <input value={armadilha} onChange={(e) => setArmadilha(e.target.value)} tabIndex={-1} aria-hidden autoComplete="off" className="hidden" />
                <label className="flex items-start gap-2.5 text-sm text-white/75">
                  <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} className="mt-0.5 size-4 accent-[var(--color-lime)]" />
                  Autorizo o contato pelo WhatsApp.
                </label>
                <button type="submit" disabled={!aceite || nome.trim().length < 2 || whatsapp.replace(/\D/g, "").length < 10} className="min-h-12 rounded-full bg-lime font-semibold text-forest disabled:opacity-40">
                  Continuar
                </button>
                {erro && <p className="text-sm font-semibold text-red-300">{erro}</p>}
              </motion.form>
            ) : (
              <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-3 text-center">
                <div className="font-display text-xl font-extrabold">Logo reservada, {nome.split(" ")[0]}!</div>
                <p className="text-sm text-white/70">Confirme no WhatsApp para receber o Pix e os arquivos.</p>
                <a
                  href={linkWhatsApp(`Oi! Sou ${nome}. Criei minha logo no seu site e quero os arquivos (${reais(precos.logoExpress)}): ${link}`)}
                  target="_blank"
                  rel="noopener"
                  className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-lime font-semibold text-forest"
                >
                  <WhatsAppIcon /> Confirmar no WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {modoAdmin && (
          <div className="grid gap-2 rounded-2xl border border-dashed border-line p-4">
            <div className="text-sm font-semibold">Área interna</div>
            {!liberado ? (
              <div className="flex gap-2">
                <input type="password" value={chave} onChange={(e) => setChave(e.target.value)} placeholder="ADMIN_CHAVE" className={campo} />
                <button type="button" onClick={conferirChave} className="rounded-xl bg-forest px-4 font-semibold text-white">
                  Liberar
                </button>
              </div>
            ) : (
              <button type="button" onClick={baixar} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand font-semibold text-white">
                <Download className="size-4" /> Baixar SVG
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
