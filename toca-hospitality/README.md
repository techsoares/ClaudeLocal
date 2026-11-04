# TOCA Hospitality

Marca, landing page e folders da TOCA, empresa de gestão operacional de imóveis por temporada.

| Pasta / arquivo | O que tem |
|---|---|
| `SPEC.md` | Estratégia, decisões de design, regras de uso e pendências |
| `apresentacao.html` | Caderno de marca: as 4 logos, cores, site e folders numa página só (abra no navegador) |
| `logo/` | 4 opções de logo em SVG (A Porta, **B Arco, a recomendada**, C Chaveiro, D toca.) |
| `landing/` | Site estático pronto para a Vercel (Root Directory = `toca-hospitality/landing`), com SEO local e para buscas com IA (`llms.txt`, `robots.txt`, `sitemap.xml`, JSON-LD) e 2 guias |
| `folders/` | 3 folders em HTML editável e `pdf/` prontos para gráfica |
| `previews/` | Prints do site e dos folders |

## Publicar o site
Vercel → Add New → Project → importar o repositório → **Root Directory: `toca-hospitality/landing`** → Framework: Other → Deploy.
Mais detalhes na seção 4 do `SPEC.md`.

## Editar textos
- Site: `landing/index.html` (textos) e `landing/styles.css` (cores no topo, em `:root`).
- Folders: edite o HTML e gere o PDF de novo pelo Chrome (Imprimir → Salvar como PDF, margens "Nenhuma", com "Gráficos de plano de fundo" marcado).
- Trocar a logo: substitua os arquivos de `landing/assets/` e `folders/assets/`, mantendo os mesmos nomes.
