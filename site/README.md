# Site de venda: sites e landing pages

Feito em Next.js, Tailwind CSS e Motion (animações).

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| Nome, marca, WhatsApp, e-mail, Instagram, cidade, domínio | `src/lib/config.ts` |
| Preços | `src/lib/config.ts` (`precos`) |
| Avaliações, portfólio e perguntas frequentes | `src/lib/content.ts` |
| Modelos de site para o cliente escolher | `src/lib/modelos.ts` |
| Prints do portfólio e sua foto | pasta `public/` |

### Avaliações
Depoimentos com `exemplo: true` só aparecem quando você roda o site no seu computador (`npm run dev`),
com a etiqueta "EXEMPLO". **Eles nunca vão para o site publicado.** Quando um cliente mandar um
depoimento real, cadastre sem o `exemplo`. Se não houver nenhum depoimento real, a seção some sozinha.

### Modelos prontos
A galeria fica em `/modelos` e cada modelo tem uma demonstração ao vivo em `/modelos/<nome>`.
Para criar um modelo novo, copie um bloco em `src/lib/modelos.ts` e troque os dados: segmento, cores,
fonte (`bricolage`, `fraunces` ou `grotesk`), layout (`dividido`, `centro` ou `cinema`) e textos.
A página de demonstração e o cartão da galeria são gerados sozinhos.

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicar (grátis na Vercel)

1. Crie uma conta em vercel.com e entre com o GitHub.
2. "Add New → Project", escolha este repositório e em **Root Directory** selecione `site`.
3. Clique em Deploy. Em 1 minuto o site está no ar com um endereço `.vercel.app`.
4. Para usar seu domínio: registre no registro.br e, na Vercel, vá em Settings → Domains.
