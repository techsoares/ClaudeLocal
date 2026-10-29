# Site de venda: sites, landing pages e logos

Feito em Next.js, Tailwind CSS e Motion (animações).

## O que o site faz

| Recurso | Onde fica |
|---|---|
| Página de vendas com planos e calculadora | `/` |
| Diagnóstico de 30s que captura o lead e gera proposta na hora | `/#diagnostico` |
| Galeria de modelos prontos com demonstração ao vivo | `/modelos` |
| Criador de logo (lead + venda de logo) | `/logo` |
| Páginas por nicho para Google e anúncios ("Site para hamburguerias"...) | `/para/<nicho>` |
| Proposta personalizada, assinada e com botão "Salvar em PDF" | `/proposta?...` |
| Gerador de propostas (só com a sua chave) | `/proposta/nova` |
| Exportar SVG de uma logo criada pelo cliente | abra o link da logo com `&admin` no fim |
| Resumo para buscas com IA | `/llms.txt` |
| Mapa do site e robôs | `/sitemap.xml`, `/robots.txt` |
| Política de privacidade (LGPD) | `/privacidade` |

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| Nome, marca, WhatsApp, e-mail, Instagram, cidade | `src/lib/config.ts` |
| Preços (site, extras, logo) | `src/lib/config.ts` (`precos`) |
| Avaliações, portfólio e perguntas frequentes | `src/lib/content.ts` |
| Modelos de site para o cliente escolher | `src/lib/modelos.ts` |
| Páginas por nicho | `src/lib/nichos.ts` |
| Prints do portfólio e sua foto | pasta `public/` |

### Avaliações
Depoimentos com `exemplo: true` só aparecem quando você roda o site no seu computador (`npm run dev`),
com a etiqueta "EXEMPLO". **Eles nunca vão para o site publicado.** Quando um cliente mandar um
depoimento real, cadastre sem o `exemplo`. Se não houver nenhum depoimento real, a seção some sozinha.

### Modelos prontos
Para criar um modelo novo, copie um bloco em `src/lib/modelos.ts` e troque os dados: segmento, cores,
fonte (`bricolage`, `fraunces` ou `grotesk`), layout (`dividido`, `centro`, `cinema` ou `lanchonete`) e textos.
Restaurantes podem ter `cardapio` e `local`. A demonstração e o cartão da galeria são gerados sozinhos.

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | Para quê | Obrigatória |
|---|---|---|
| `PROPOSTA_SEGREDO` | Assina as propostas. Qualquer texto longo e aleatório. | Sim |
| `ADMIN_CHAVE` | Sua senha do gerador de propostas e da exportação de logo. | Sim |
| `LEAD_WEBHOOK_URL` | Para onde vão os leads (planilha do Google, n8n, Make, CRM). | Recomendado |
| `NEXT_PUBLIC_SITE_URL` | Seu domínio, ex.: `https://andressasoares.com.br`. | Quando tiver domínio |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pixel da Meta (Instagram/Facebook Ads). | Para anúncios |
| `NEXT_PUBLIC_GOOGLE_TAG_ID` | Google Analytics 4 (`G-...`). | Para anúncios |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD` | Conversão do Google Ads (`AW-.../rótulo`). | Para anúncios |

Para gerar um segredo: `openssl rand -base64 32`. Depois de mudar variáveis, faça um novo deploy.

Sem `LEAD_WEBHOOK_URL`, os leads aparecem só no log da Vercel (Deployments → Functions → Logs).

### Receber os leads numa planilha do Google (grátis)
1. Crie uma planilha e vá em **Extensões → Apps Script**.
2. Cole o código abaixo e salve.
3. **Implantar → Nova implantação → Tipo: App da Web**, "Executar como: eu", "Quem pode acessar: qualquer pessoa".
4. Copie a URL gerada e coloque em `LEAD_WEBHOOK_URL` na Vercel.

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (aba.getLastRow() === 0) aba.appendRow(["Data", "Origem", "Nome", "WhatsApp", "Negócio", "Respostas", "Veio de", "Proposta"]);
  aba.appendRow([
    d.recebido_em, d.origem, d.nome, "'" + d.whatsapp, d.negocio,
    JSON.stringify(d.respostas), JSON.stringify(d.utm), d.proposta,
  ]);
  return ContentService.createTextOutput("ok");
}
```

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para testar propostas localmente, crie um arquivo `.env.local` com
`ADMIN_CHAVE=qualquercoisa`.

## Publicar (grátis na Vercel)

1. Crie uma conta em vercel.com e entre com o GitHub.
2. "Add New → Project", escolha este repositório e em **Root Directory** selecione `site`.
3. Cadastre as variáveis de ambiente da tabela acima.
4. Clique em Deploy. Em 1 minuto o site está no ar com um endereço `.vercel.app`.
5. Para usar seu domínio: registre no registro.br e, na Vercel, vá em Settings → Domains.

Depois de publicar, siga o `docs/trafego-pago.md` na raiz do repositório (Google, IA e anúncios).
