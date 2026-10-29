export type Depoimento = {
  nome: string;
  negocio: string;
  texto: string;
  estrelas: 1 | 2 | 3 | 4 | 5;
  // Depoimentos de exemplo só aparecem rodando localmente (npm run dev),
  // para você ver o layout. Eles NUNCA vão para o site publicado.
  // Quando tiver um depoimento real, cadastre sem "exemplo".
  exemplo?: boolean;
};

export const depoimentos: Depoimento[] = [
  {
    nome: "Nome do cliente",
    negocio: "4Core",
    texto: "Peça para o cliente da 4Core escrever 2 ou 3 frases sobre como foi trabalhar com você e cole aqui.",
    estrelas: 5,
    exemplo: true,
  },
  {
    nome: "Nome do cliente",
    negocio: "Segmento do negócio",
    texto: "Depoimento real de um cliente: o que mudou depois que o site entrou no ar.",
    estrelas: 5,
    exemplo: true,
  },
  {
    nome: "Nome do cliente",
    negocio: "Segmento do negócio",
    texto: "Depoimento real de um cliente: prazo, atendimento, resultado.",
    estrelas: 5,
    exemplo: true,
  },
];

export const depoimentosVisiveis = depoimentos.filter(
  (d) => !d.exemplo || process.env.NODE_ENV !== "production",
);

export type Projeto = {
  cliente: string;
  tipo: string;
  descricao: string;
  url?: string;
  imagem?: string; // coloque o print em /public/portfolio/ e informe o caminho, ex.: "/portfolio/4core.png"
  tags: string[];
};

export const projetos: Projeto[] = [
  {
    cliente: "4Core",
    tipo: "Projeto sob medida",
    descricao:
      "Site institucional com captação de leads e um sistema de gestão completo: financeiro, comercial, contratos, marketing e assistente com IA.",
    url: "https://4core.site",
    tags: ["Site", "Sistema de gestão", "Inteligência artificial"],
  },
];

export const faq = [
  {
    pergunta: "Preciso pagar mensalidade?",
    resposta:
      "Não. O site é pago uma vez só. A hospedagem do primeiro ano já está inclusa. Depois disso, o único custo fixo é a renovação anual do domínio .com.br, de cerca de R$ 40, paga direto ao Registro.br.",
  },
  {
    pergunta: "Eu preciso escrever os textos?",
    resposta:
      "Não. A partir da nossa conversa no WhatsApp eu escrevo os textos de todas as páginas. Você só revisa e aprova.",
  },
  {
    pergunta: "Qual a diferença entre site e landing page?",
    resposta:
      "O site tem várias páginas e apresenta o negócio inteiro. A landing page é uma página única focada em uma oferta, ideal para quem vai anunciar no Google ou no Instagram. As duas opções custam R$ 997.",
  },
  {
    pergunta: "E se eu não gostar do resultado?",
    resposta:
      "Você vê a primeira versão em até 48 horas. Se não gostar, não paga a segunda metade. Se gostar, faço os ajustes que você pedir até ficar do seu jeito.",
  },
  {
    pergunta: "Quais as formas de pagamento?",
    resposta: "Pix ou cartão de crédito. Metade para começar e metade quando o site estiver no ar.",
  },
  {
    pergunta: "Já tenho um domínio. Posso usar?",
    resposta: "Pode sim. Eu configuro o site no domínio que você já tem, sem custo extra.",
  },
  {
    pergunta: "Posso pedir alterações depois que o site estiver no ar?",
    resposta:
      "Sim. Pequenos ajustes nos primeiros 30 dias são por minha conta. Depois disso, faço um orçamento rápido para cada mudança.",
  },
  {
    pergunta: "Você faz projetos maiores, como loja ou sistema?",
    resposta:
      "Faço. Loja virtual, área com login, sistemas de gestão e integrações com IA. Esses projetos começam em + R$ 997 sobre o site e o valor final depende do escopo. Me chama que eu te passo um orçamento.",
  },
];
