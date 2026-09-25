# Pesquisa: skills de segurança para o Claude nas plataformas da PGMais

**Objetivo:** encontrar uma skill (ou um conjunto pequeno de skills) que dê para configurar do mesmo jeito em
todas as plataformas em desenvolvimento. A ideia é que o Claude ajude os devs a não introduzir SQL injection,
vazamento de dados e outras falhas, sem que cada projeto precise de revisão manual completa.

Pesquisa feita em setembro de 2026.

## Resumo da recomendação

Nenhuma skill sozinha cobre tudo. A combinação que atende o pedido com menos esforço tem três camadas:

| Camada | O que usar | Para quê |
|---|---|---|
| 1. Enquanto o dev escreve código | **`agamm/claude-code-owasp`** (skill `owasp-security`) | O Claude passa a seguir OWASP Top 10:2025 e ASVS 5.0 ao gerar ou alterar código: queries parametrizadas, controle de acesso, segredos e erros específicos de mais de 20 linguagens. |
| 2. Em todo Pull Request | **`anthropics/claude-code-security-review`** (GitHub Action oficial da Anthropic) + o comando `/security-review`, que já vem no Claude Code | Revisão automática do diff com comentários no PR. Aceita um arquivo de **regras próprias da PGMais**, e é aí que entra o padrão único para todas as plataformas. |
| 3. Dados pessoais (LGPD) | **`goul4rt/lgpd-skills`**, usada por tech leads/DPO e não obrigatória para todo dev | Mapeamento de dados, retenção, criptografia, anonimização e resposta a incidentes (prazo da ANPD). |

Como complemento opcional para o time de segurança/AppSec, há o **`trailofbits/skills`**, com auditoria mais
profunda (`insecure-defaults`, `sharp-edges`, `differential-review`, `static-analysis` com Semgrep/CodeQL,
`supply-chain-risk-auditor`).

Se a PGMais tiver plano **Enterprise**, vale também avaliar o **Claude Security**. Ele está em beta público,
varre o repositório inteiro e sugere patches. Um administrador da organização ativa em
*Organization settings → Claude Security*. Só funciona com GitHub.

## Opções avaliadas

### `agamm/claude-code-owasp`: recomendada para a camada 1
- **Link:** https://github.com/agamm/claude-code-owasp
- **Licença:** MIT, cerca de 370 estrelas.
- **Cobertura:** OWASP Top 10:2025, ASVS 5.0, OWASP LLM Top 10 e segurança de agentes de IA. Também traz
  armadilhas específicas de JS/TS, Python, Java, C#, Go, PHP, Ruby, Kotlin e outras linguagens.
- **Formato:** `SKILL.md` com checklist e fluxo de revisão em 5 passos, mais uma pasta `reference/` que só é
  carregada quando precisa. O custo de contexto fica baixo.
- **Pontos fortes:** é genérica, não depende de stack, e é ativada sozinha quando o assunto é auth, input de
  usuário, queries ou segredos. Cobre SQL injection de forma explícita (parametrização/ORM) e dá muita ênfase
  a Broken Access Control.
- **Lacunas:** não tem regra explícita sobre **não logar dado pessoal** nem conhece LGPD. Isso se resolve com o
  arquivo de regras da PGMais (veja abaixo).
- **Instalação:** `/plugin marketplace add agamm/claude-code-owasp`, ou copiar a pasta para `.claude/skills/`.

### `anthropics/claude-code-security-review`: recomendada para a camada 2
- **Link:** https://github.com/anthropics/claude-code-security-review
- **Licença:** MIT. É oficial da Anthropic.
- **O que faz:** roda em cada PR, analisa só os arquivos alterados, segue o fluxo de dados entre arquivos e
  comenta no PR. Detecta SQL/command injection, falhas de autenticação/autorização, exposição de dados,
  criptografia fraca, XSS, desserialização insegura etc. Tem filtro de falsos positivos.
- **Por que resolve o "igual para todas as plataformas":** aceita
  - `custom-security-scan-instructions`: um arquivo texto com **as regras da PGMais**, adicionado ao prompt de auditoria;
  - `false-positive-filtering-instructions`: o que o time decidiu ignorar.

  Dá para manter esses dois arquivos num repositório central e reaproveitar em todos os projetos.
- **Atenção:** a própria documentação avisa que a Action **não é protegida contra prompt injection**. Use só
  em PRs confiáveis e ative "Require approval for all external contributors".
- **Localmente:** o comando `/security-review`, que já vem no Claude Code, faz a mesma análise antes do push.

### `goul4rt/lgpd-skills`: recomendada para a camada 3
- **Link:** https://github.com/goul4rt/lgpd-skills
- **Licença:** MIT, cerca de 60 estrelas. É um projeto novo.
- **Cobertura:** 1 skill orquestradora (`lgpd-audit`) e 18 sub-skills. Tratam de base legal, mapeamento de
  dados (ROPA), RIPD, retenção/eliminação, criptografia (TLS, KMS, crypto-shredding), tokenização/k-anonimato,
  logs de auditoria imutáveis e incidentes.
- **Ressalva:** o foco maior é conformidade e documentação, não varredura de código. Serve como apoio e não
  substitui o jurídico/DPO.

### `trailofbits/skills`: complemento para AppSec
- **Link:** https://github.com/trailofbits/skills
- **Licença:** CC-BY-SA-4.0, cerca de 7 mil estrelas. É a referência mais respeitada da área.
- **Mais úteis para a PGMais:** `insecure-defaults` (configurações que "falham aberto"), `sharp-edges`
  (APIs e configs perigosas), `differential-review` (revisão de mudanças com histórico git),
  `static-analysis` (Semgrep, CodeQL, SARIF) e `supply-chain-risk-auditor` (dependências npm/PyPI/Go).
- **Por que não é a principal:** é voltada a auditores. É mais pesada e profunda do que o dev do dia a dia precisa.

### Outras encontradas (não recomendadas como base)
| Repositório | Motivo |
|---|---|
| `AgriciDaniel/claude-cybersecurity` (MIT, cerca de 220 estrelas) | 8 agentes de auditoria, bem completa, mas **só faz revisão**: não orienta a escrita de código. Pode servir como alternativa à Action em projetos fora do GitHub. |
| `harperaa/secure-claude-skills` | Muito boa, mas presa a uma stack (Next.js + Clerk + Convex). |
| `markusweldon/claude-owasp-security-skills`, `joaovicdev/claude-appsec` | Parecidas com a `agamm`, com menos adoção. |
| `Masriyan/Claude-Code-CyberSecurity-Skill`, `awesome-claude-skills-security` | Foco ofensivo (pentest, CTF, payloads). Não é o caso de uso. |

## Como padronizar em todas as plataformas

1. **Repositório central da PGMais**, por exemplo `pgmais/claude-security-baseline`, com:
   - uma cópia fixada (fork ou commit específico) da skill `owasp-security`;
   - uma skill própria `pgmais-seguranca` com as regras internas (veja o esboço abaixo);
   - `security-requirements.txt` e `false-positive-filters.txt` para a Action;
   - um workflow reutilizável (`workflow_call`) que roda a `claude-code-security-review`.
2. **Em cada projeto:** apontar para esse marketplace/plugin (`/plugin marketplace add pgmais/claude-security-baseline`),
   ou copiar `.claude/skills/`, e chamar o workflow reutilizável num `.github/workflows/security.yml` de poucas linhas.
3. **Um `CLAUDE.md` padrão** em cada repositório com 5 a 10 regras inegociáveis, que o Claude carrega sempre.

### Esboço das regras próprias (`pgmais-seguranca`)
- Nunca montar SQL concatenando strings. Usar sempre query parametrizada ou ORM, inclusive em `ORDER BY` e
  nomes de coluna (usar allowlist).
- Nunca logar CPF, telefone, e-mail, conteúdo de mensagem, token ou senha. Mascarar no logger
  (ex.: `***.***.***-12`).
- Nenhum segredo no código ou no `.env` commitado. Usar o cofre de segredos da empresa.
- Todo endpoint exige autenticação por padrão, e a autorização verifica se o recurso pertence ao
  cliente/tenant do usuário (IDOR).
- Respostas de erro nunca expõem stack trace, SQL ou dados de outro cliente.
- Exportações e relatórios com dados pessoais precisam de controle de acesso e registro de auditoria.
- Dependências novas passam por verificação de vulnerabilidades (`npm audit`, `pip-audit`, Dependabot).

## Cuidados antes de adotar skills de terceiros

Uma skill é um conjunto de instruções (e às vezes scripts) que o Claude executa com as permissões do dev. Já
existem pesquisas mostrando skills maliciosas usadas para **exfiltrar dados**. Por isso:
- leia o conteúdo antes de adotar e **fixe a versão** (fork interno ou commit), sem puxar `main` automaticamente;
- prefira skills só de texto (`SKILL.md`). Revise com atenção qualquer script incluído;
- essas ferramentas **não substituem** SAST/DAST, pentest nem a revisão humana nos sistemas mais críticos.
  Elas reduzem bastante o volume de falhas simples que chegam até essa etapa.

## Fontes
- https://github.com/agamm/claude-code-owasp
- https://github.com/anthropics/claude-code-security-review
- https://www.anthropic.com/news/automate-security-reviews-with-claude-code
- https://support.claude.com/en/articles/14661296-use-claude-security
- https://github.com/trailofbits/skills
- https://github.com/goul4rt/lgpd-skills
- https://github.com/AgriciDaniel/claude-cybersecurity
- https://github.com/harperaa/secure-claude-skills
- https://github.com/markusweldon/claude-owasp-security-skills
- https://github.com/joaovicdev/claude-appsec
- https://snyk.io/articles/top-claude-skills-cybersecurity-hacking-vulnerability-scanning/
- https://idanhabler.medium.com/new-skills-new-threats-exfiltrating-data-from-claude-e9112aeac11b
