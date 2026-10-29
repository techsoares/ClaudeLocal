// Tudo que é "dado seu" fica aqui. Mudou nome, número ou preço? Troque só neste arquivo.

export const config = {
  nome: "Andressa Soares",
  // Aparece no logo do topo. Se escolher uma marca, troque aqui.
  marca: "Andressa Soares",
  // DDI + DDD + número, só dígitos.
  whatsapp: "5541984295040",
  whatsappVisivel: "(41) 98429-5040",
  email: "",
  instagram: "",
  cidade: "Curitiba, PR",
};

// Endereço público do site. Na Vercel, defina NEXT_PUBLIC_SITE_URL (ex.: https://andressasoares.com.br).
// A Vercel já preenche NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL sozinha, então funciona mesmo antes do domínio.
const producaoVercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || (producaoVercel ? `https://${producaoVercel}` : "http://localhost:3000")
).replace(/\/$/, "");

export const precos = {
  site: 997,
  blog: 497,
  projetoMaior: 997,
  logo: 99.99, // logo personalizada feita por você
  logoExpress: 9.99, // o cliente monta no criador de logo e recebe os arquivos
};

// Planos mensais (cobrados por assinatura no Asaas)
export const precosMensais = {
  cuidado: 49,
  crescimento: 149,
  anuncios: 397,
};

export const prazos = {
  primeiraVersao: "48h",
  noAr: "7 dias",
};

// IDs de anúncios. Ficam vazios até você criar as contas; aí é só colar na Vercel.
export const rastreio = {
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  googleTag: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "", // GA4: G-XXXXXXX
  googleAdsLead: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD ?? "", // AW-XXXXXXX/rotulo
};

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function reais(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: valor % 1 === 0 ? 0 : 2,
  });
}
