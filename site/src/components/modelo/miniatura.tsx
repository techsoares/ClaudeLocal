"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const LARGURA = 1280;
const ALTURA = 800;

// Mostra um site de 1280px reduzido para caber no cartão, como uma captura de tela viva.
export function Miniatura({ children, className = "" }: { children: ReactNode; className?: string }) {
  const caixa = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(0.25);

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const medir = () => setEscala(el.clientWidth / LARGURA);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={caixa} className={`relative aspect-[16/10] overflow-hidden ${className}`} aria-hidden>
      <div
        inert
        className="pointer-events-none absolute top-0 left-0 origin-top-left select-none"
        style={{ width: LARGURA, height: ALTURA, transform: `scale(${escala})` }}
      >
        {children}
      </div>
    </div>
  );
}
