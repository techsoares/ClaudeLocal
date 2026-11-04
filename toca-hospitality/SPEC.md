# TOCA Hospitality: spec de marca, landing page e folders

> Gestão operacional de imóveis por temporada (Airbnb, Booking e afins).
> Contato: WhatsApp (41) 99896-0730.
> Este documento registra as decisões tomadas, o porquê de cada uma e o que ainda precisa da confirmação da dona da TOCA.

---

## 1. Estratégia

### 1.1 Para quem a TOCA fala
O público é o **proprietário do imóvel**, não o hóspede. São três perfis:

| Perfil | Dor principal | O que precisa ouvir |
|---|---|---|
| Investidor que mora longe | Não consegue estar no imóvel para receber e conferir | "A gente está lá por você." |
| Proprietário com agenda cheia | O imóvel virou um segundo emprego (mensagens de madrugada, correria nas trocas) | "Você só acompanha." |
| Quem está começando ou improvisa | Cada troca é uma correria, sem processo | "Vamos organizar isso." |

### 1.2 Posicionamento
**Cuidado de perto, com processo.** Grandes operadoras (GuestReady, Houst, Seazone e outras) vendem escala e tecnologia. A TOCA é pequena e próxima, e isso é argumento de venda: alguém que conhece o imóvel e responde no WhatsApp.

- **Nome**: "toca" é refúgio, lugar quente e protegido. A marca toda gira em torno da **porta em arco** (a entrada da toca).
- **Assinatura**: *Seu imóvel trabalhando. A TOCA cuidando.*
- **Fechamento**: *Você acompanha. A TOCA cuida.*
- **Tom de voz**: próximo, direto, sem jargão de hotelaria nem "gestão inteligente 360°". Frases curtas, em primeira pessoa do plural ("a gente cuida"). Nunca prometer número que não dá para provar (taxa de ocupação, faturamento, avaliações).

### 1.3 Referências pesquisadas
- **GuestReady** (Londres): o rebranding fala direto com o proprietário ("embrace your place"). Referência de mensagem, não de visual.
- **Plum Guide / onefinestay / Mr & Mrs Smith**: hotelaria boutique editorial, com tipografia serifada, muito respiro e foto real em vez de ícone.
- **Revistas Kinfolk e Cereal**: tom calmo, texto curto e grid assimétrico.
- **Objetos de hotel antigo**: chaveiro de quarto com número, ficha de governança (*housekeeping checklist*) e carimbo. Daqui saíram os elementos gráficos próprios da TOCA.
- **Curitiba**: a araucária entrou na ilustração da janela como detalhe local, de leve e sem virar clichê turístico.

### 1.4 Como evitar a "cara de IA"
A paleta (verde floresta, terracota e bege) veio da marca existente e foi mantida. Para não cair no visual genérico de site feito por IA (creme, serifa e terracota em cards arredondados com ícones):

1. **Detalhes que só esse negócio tem**: a ficha do "dia de troca" com horários, o chaveiro de quarto "Nº 41" (o DDD de Curitiba), o checklist de governança e o carimbo.
2. **Nada de grade de 6 cards com ícone.** Os serviços aparecem como lista editorial numerada com filetes.
3. **Ilustração própria** (janela em arco com araucárias) no lugar de banco de imagem, até existirem fotos reais.
4. **Tipografia fora do óbvio**: Newsreader e Hanken Grotesk. Evitamos Playfair, Montserrat, Inter e Poppins.
5. **Texto específico**: "o chuveiro que não esquenta, a senha do Wi-Fi, a chave esquecida" em vez de "soluções completas".

---

## 2. Logo: 4 opções

Arquivos em `logo/` (todos em SVG vetorial, com texto convertido em curvas, prontos para a gráfica). A página `apresentacao.html` mostra todas lado a lado, aplicadas.

### Diagnóstico da logo atual
- ✅ A paleta e a ideia do **arco terracota** são ótimas. Ficam.
- ⚠️ O **telhado** é o ícone mais usado por imobiliárias e construtoras. Ele posiciona a TOCA como "imóveis", e o negócio dela é **cuidado/hospitalidade**.
- ⚠️ A **janelinha dentro do "A"** some em tamanho pequeno (avatar do WhatsApp, favicon).
- ⚠️ São muitos elementos ao mesmo tempo: telhado, arco, janela, palavra e subtítulo.

### Opção A · Porta (evolução da atual)
Telhado e arco mais limpos, sem a janelinha, com caixa-alta clássica (Marcellus).
- **Prós**: continuidade com o que ela já tem e leitura imediata de "casa".
- **Contras**: o telhado continua genérico, com cara de imobiliária.
- Arquivos: `opcao-a-porta/`

### Opção B · Arco ⭐ recomendada
O "O" de TOCA **vira a porta da toca**: um arco cheio em terracota no meio de uma Bodoni de alto contraste. O símbolo é só a porta, com uma soleira.
- **Prós**: é própria (ninguém mais tem), elegante e de hotelaria boutique, e o símbolo funciona sozinho em avatar, favicon e carimbo. Mantém o arco terracota que já existia.
- **Contras**: a Bodoni tem traços finos. Abaixo de ~100 px de largura, use o símbolo sozinho.
- Arquivos: `opcao-b-arco/` (a versão `-horizontal` tem o respiro já cortado, para site e impressos)

### Opção C · Chaveiro
A marca é o **chaveiro de quarto de hotel antigo**, com "Nº 41" (DDD de Curitiba).
- **Prós**: memorável, conta a história de hospitalidade e vira objeto físico (chaveiro de verdade para entregar ao hóspede).
- **Contras**: o formato horizontal é mais difícil de aplicar em espaços pequenos. Funciona melhor como **elemento secundário** de qualquer opção.
- Arquivos: `opcao-c-chaveiro/`

### Opção D · toca.
Minúsculas calorosas (Young Serif). O **ponto final é uma portinha**.
- **Prós**: a mais próxima e simpática, ótima para Instagram. Passa "pessoa", não "empresa".
- **Contras**: é menos "premium". Se a ideia for cobrar como gestão boutique, B comunica melhor.
- Arquivos: `opcao-d-ponto/`

> **Recomendação:** B como marca principal, com o chaveiro (C) e a ficha de checklist como elementos de apoio. A landing page e os folders já estão com a B. Para trocar, basta substituir os arquivos de `landing/assets/` e `folders/assets/` (os nomes são os mesmos).

### Regras de uso (opção B)
- Área de proteção: a altura do arco em volta da marca.
- Tamanho mínimo: marca completa com 100 px / 25 mm de largura; abaixo disso, só o símbolo.
- Fundos permitidos: linho, bege, verde floresta e terracota (no terracota, use a versão `-linho`, toda clara).
- Não aplicar sobre foto movimentada, não distorcer e não trocar a cor do arco (ele é sempre terracota, exceto na versão monocromática).

---

## 3. Identidade visual

### Paleta
| Nome | HEX | Uso |
|---|---|---|
| Verde floresta | `#1F2B24` | texto principal, fundos de destaque, botões |
| Terracota | `#A65A32` | arco do logo, detalhes, faixas de destaque |
| Terracota texto | `#8E4726` | terracota para **texto** sobre fundo claro (contraste AA) |
| Terracota claro | `#D99A70` | destaques sobre o verde |
| Bege | `#D8C8B0` | linhas, textos secundários sobre o verde |
| Linho | `#F3ECE1` | fundo principal |
| Papel | `#EAE0D0` | fundo alternativo, folders |
| Musgo | `#55604B` | rótulos, ilustração |
| Preto suave | `#1B1916` | rodapé, logo em preto |

Para impressão, peça à gráfica a prova de cor. Os valores CMYK aproximados são: verde 75/50/70/65, terracota 20/70/90/10 e linho 3/5/10/0.

### Tipografia (todas gratuitas, no Google Fonts)
- **Newsreader**: títulos, em romano e itálico. O itálico terracota marca a "virada" da frase (*A TOCA cuidando.*).
- **Hanken Grotesk**: textos e botões.
- **DM Mono**: só nos elementos de "ficha" (horários, Nº, checklist).
- **Bodoni Moda / Marcellus / Young Serif**: só dentro dos logos, já convertidas em curvas.

### Elementos gráficos
- **Arco** (porta da toca): moldura de imagem, marcador de lista e corte especial do folder 3.
- **Ficha "Dia de troca"**: mostra o serviço funcionando, com horários e checkboxes.
- **Chaveiro Nº 41**: objeto-assinatura.
- **Janela com araucárias**: ilustração-coringa enquanto não houver fotos reais.

### Fotografia (quando houver)
Fotos reais dos imóveis atendidos, com luz natural de fim de tarde, detalhes (cama feita, toalha dobrada, chave na mesa) e nunca banco de imagem com pessoas sorrindo para a câmera. Na landing, substitua `assets/janela.svg` por uma foto recortada em arco.

---

## 4. Landing page

Pasta `landing/`: HTML, CSS e JS puros, sem build e sem dependências. Carrega rápido, funciona em qualquer hospedagem e é fácil de editar.

### Estrutura
1. **Topo fixo**: logo, menu e botão WhatsApp.
2. **Hero**: assinatura, texto de apoio e CTA. À direita, a janela em arco com a ficha do "dia de troca" e o chaveiro balançando.
3. **O que fica com a gente**: os 6 serviços em lista editorial numerada.
4. **Dia de troca** (fundo verde): linha do tempo 11h → 15h → estadia. É a seção que explica o serviço sem jargão.
5. **Você acompanha. A TOCA cuida.**: duas colunas, "fica com você" e "fica com a TOCA".
6. **Formatos**: Operação completa e Sob medida, sem preço.
7. **Para quem é**: os três perfis.
8. **Perguntas frequentes**, em acordeão nativo (`<details>`), acessível e sem JS.
9. **CTA final**: "Conta pra gente sobre o seu imóvel."
10. **Rodapé**: WhatsApp e Instagram.

Todos os botões abrem o WhatsApp com **mensagem já preenchida**, diferente para cada botão. Assim dá para saber de onde veio o contato. No celular aparece um botão flutuante de WhatsApp.

### Técnico
- SEO: title, description, Open Graph com imagem (`assets/og.png`), JSON-LD `LocalBusiness`, canonical e favicon SVG + apple-touch-icon.
- Acessibilidade: link "pular para o conteúdo", foco visível, contraste AA e `prefers-reduced-motion` respeitado.
- Responsivo: testado em 1440 px e 390 px, sem rolagem horizontal.
- `vercel.json`: URLs limpas, cache longo para `/assets` e cabeçalhos básicos de segurança.

### Publicar na Vercel (5 minutos)
1. Crie uma conta em vercel.com (dá para entrar com o GitHub).
2. **Add New → Project** → importe este repositório.
3. Em **Root Directory**, escolha `toca-hospitality/landing`.
4. **Framework Preset**: `Other`. Deixe Build Command e Output Directory vazios.
5. **Deploy**. O site sai em `algo.vercel.app`.
6. Domínio próprio: compre `tocahospitality.com.br` no Registro.br e, na Vercel, vá em **Settings → Domains → Add** e siga as instruções de DNS.
7. Se o domínio final for outro, troque `https://tocahospitality.com.br/` no `<head>` do `index.html` (canonical, og:image e JSON-LD).

Alternativa sem GitHub: instale a CLI (`npm i -g vercel`), entre em `toca-hospitality/landing` e rode `vercel --prod`.

---

## 5. Folders: 3 opções

Pasta `folders/`. Cada folder tem o **HTML editável** e o **PDF pronto** em `folders/pdf/`, com 3 mm de sangria e fontes embutidas. As prévias em PNG ficam em `previews/`. As linhas-guia coloridas (dobra em azul, corte em magenta) só aparecem na tela e não saem no PDF.

O QR code de todos os folders abre o WhatsApp com a mensagem "Olá! Vi o folder da TOCA e quero saber mais." Assim dá para medir o que veio do impresso.

### Folder 1 · Editorial (A4 tri-dobra)
- **Formato**: A4 aberto (297 × 210 mm), 3 painéis de 99 mm, dobra sanfona ou carteira.
- **Para quê**: o material completo, para entregar em reunião com proprietário, deixar em imobiliária parceira ou mandar em PDF.
- **Conteúdo**: capa verde com o logo e a janela em arco; aba com os 5 motivos; contracapa com "como começar" e QR; miolo com a assinatura, os 6 serviços, os dois formatos e a linha do tempo do dia de troca.
- **Papel sugerido**: couché fosco 150 g ou, melhor, papel com textura (Pólen Bold 120 g ou Markatto) para o toque artesanal.
- ⚠️ **Na gráfica**: na dobra carteira, o painel que dobra para dentro (o da esquerda, no lado externo) deve ter 97 mm. Peça para a gráfica ajustar ou envie o PDF pedindo "ajuste de dobra carteira".

### Folder 2 · Ficha de cuidado (A5 frente e verso)
- **Formato**: A5 (148 × 210 mm), frente e verso.
- **Para quê**: panfleto direto e barato para distribuir em condomínios com muito Airbnb, portarias, imobiliárias e eventos.
- **Conceito**: imita a **ficha de governança de hotel**, com checklist marcado, "quem cuida: TOCA", carimbo e picote no topo. Na frente ficam os serviços; no verso, como funciona, os formatos e o contato.
- **Papel sugerido**: offset 180 g ou reciclato 180 g (reforça a ideia de ficha). Um acabamento opcional que vale a pena: o carimbo aplicado à mão com um carimbo de borracha de verdade.

### Folder 3 · Arco (DL com faca especial)
- **Formato**: 99 × 210 mm com **topo cortado em arco** (raio de 49,5 mm). É a porta da toca em papel.
- **Para quê**: o mais memorável. Para deixar dentro do imóvel, entregar junto com a chave, usar como marcador ou mandar junto com um mimo para potenciais clientes.
- **Conteúdo**: na frente, a janela com araucárias e a assinatura sobre terracota; no verso, os 6 serviços e o contato com QR.
- **Arquivo**: o PDF tem 3 páginas: frente, verso e **faca** (linha de corte em magenta, que vai para a gráfica como referência e não é impressa).
- **Papel sugerido**: cartão 300 g fosco, com laminação fosca ou soft touch.
- Custa mais pela faca especial. Se o orçamento apertar, dá para imprimir retangular: a arte já tem sangria e o arco está desenhado.

---

## 6. Pendências (confirmar com a dona da TOCA)
- [ ] **Escolher a logo** (A, B, C ou D). A recomendação é a B.
- [ ] **Região atendida**: escrevi "Curitiba e região" por causa do DDD 41. Confirme ou ajuste no site e nos folders.
- [ ] **Instagram**: o rodapé aponta para `instagram.com/tocahospitality`. Crie o perfil ou troque o link.
- [ ] **Domínio**: verificar se `tocahospitality.com.br` está livre no Registro.br.
- [ ] **Fotos reais** de pelo menos 1 ou 2 imóveis atendidos, para substituir a ilustração e ganhar confiança.
- [ ] **Depoimentos**: incluir uma seção só quando houver depoimentos reais, com nome e autorização. Não inventar.
- [ ] **Horários do "dia de troca"**: são ilustrativos (e estão marcados assim). Ajuste à rotina real se quiser.
- [ ] **CNPJ e razão social** no rodapé, quando houver.

## 7. Próximos passos sugeridos
1. Perfil comercial no WhatsApp Business, com o símbolo da opção B como foto, catálogo com os 2 formatos e respostas rápidas.
2. Instagram com 9 posts iniciais: 3 sobre o "dia de troca", 3 bastidores de limpeza e preparação e 3 sobre os serviços.
3. Perfil de coanfitriã no Airbnb, que é a vitrine onde os proprietários já procuram.
4. Kit de boas-vindas para o hóspede (cartão em arco com a senha do Wi-Fi, regras da casa e o contato da TOCA) para virar marketing silencioso.
