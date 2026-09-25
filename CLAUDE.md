# Memória compartilhada — Andressa Soares

Este arquivo é lido pelo Claude Code tanto no computador local quanto nas sessões na nuvem.
Para "lembrar" algo entre os dois ambientes, adicione aqui, faça commit e push (e `git pull` do outro lado).

## Sobre mim
- Andressa Soares — Analista de ControlDesk PL, departamento ONE (PG Mais).
- Idioma: responder sempre em português (pt-BR).

## Jira
- Site: https://pgmais.atlassian.net (cloudId `89291bdd-c535-40b2-b213-ab2a096b6187`).
- Projeto principal: **DX**.
- Acompanho 3 equipes; 2 delas são componentes do DX:
  - **PreOne** — component id `11458`
  - **Implantação AD** — component id `11459`
  - Terceira equipe: _(a definir)_
- Outros componentes do DX (não são meus): Portal (11456), Barramento (11457), Telecobrança (11460), Files (11559).

### JQL úteis
- Abertas das minhas equipes:
  `project = DX AND component in (11458, 11459) AND statusCategory != Done ORDER BY component, status, updated DESC`
- Atrasadas:
  `project = DX AND component in (11458, 11459) AND statusCategory != Done AND duedate < now() ORDER BY duedate`

### Fluxo de status observado no DX
Backlog → Em andamento → Aguarda informações / Pronto para retomada → Aguarda homologação → Concluído
