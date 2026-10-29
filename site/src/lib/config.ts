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
  dominio: "", // ex.: "https://andressasoares.com.br"
};

export const precos = {
  site: 997,
  blog: 497,
  projetoMaior: 997,
};

export const prazos = {
  primeiraVersao: "48h",
  noAr: "7 dias",
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
