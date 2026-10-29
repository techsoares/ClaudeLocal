import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { config } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const titulo = `Site profissional em 7 dias a partir de R$ 997 | ${config.marca}`;
const descricao =
  "Seu site ou landing page no ar em até 7 dias, a partir de R$ 997, com domínio .com.br incluso. Primeira versão em 48h e você só paga a segunda metade se gostar.";

export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  ...(config.dominio ? { metadataBase: new URL(config.dominio) } : {}),
  openGraph: {
    title: "Site profissional em 7 dias a partir de R$ 997",
    description: descricao,
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${bricolage.variable} antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
