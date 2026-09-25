# Memória compartilhada: Andressa Soares

Este arquivo é lido pelo Claude Code tanto no computador local quanto nas sessões na nuvem.
Para "lembrar" algo entre os dois ambientes, adicione aqui, faça commit e push (e `git pull` do outro lado).

## Sobre mim
- Andressa Soares, Analista de ControlDesk PL, departamento ONE (PG Mais). Papel técnico/dados com responsabilidade de liderança (gestora de equipes).
- Diretora de produto: Sirlene.
- Idioma: responder sempre em português (pt-BR).

## Preferências de escrita e trabalho
- **Nunca usar travessão / em dash (—)**. Usar vírgula, parênteses ou ponto.
- Nas análises de chamados, considerar **só os abertos** (`statusCategory != Done`), a menos que eu peça o contrário.
- Nunca afirmar que algo "não existe em lugar nenhum" sem verificação completa. Se a varredura foi parcial, dizer que foi parcial.

## Jira
- Site: https://pgmais.atlassian.net (cloudId `89291bdd-c535-40b2-b213-ab2a096b6187`).
- Projeto principal: **DX**.
- Acompanho 3 equipes:
  - **PreOne**: projeto DX, component id `11458`
  - **Implantação AD**: projeto DX, component id `11459`
  - **Produto**: projeto **EF**, campo `customfield_10934` = "Produto" (option id `11354`)
- Outros componentes do DX (não são meus): Portal (11456), Barramento (11457), Telecobrança (11460), Files (11559).
- Outros projetos citados em bloqueios: DONE1, SI.

### JQL úteis
- Abertas das minhas equipes:
  `project = DX AND component in (11458, 11459) AND statusCategory != Done ORDER BY component, status, updated DESC`
- Abertas de Produto (EF):
  `project = EF AND cf[10934] = "Produto" AND statusCategory != Done ORDER BY status, updated DESC`
- Atrasadas (DX):
  `project = DX AND component in (11458, 11459) AND statusCategory != Done AND duedate < now() ORDER BY duedate`

### Fluxo de status observado no DX
Backlog → Em andamento → Aguarda informações / Pronto para retomada → Aguarda homologação → Concluído

### Chamados fechados no DX
- O workflow do DX **não preenche o campo Resolution** (`resolved`/`resolution` ficam vazios).
- Para filtrar por data de fechamento use `statusCategoryChangedDate`, ex.:
  `project = DX AND component = 11458 AND statusCategory = Done AND statusCategoryChangedDate >= -30d`

## Plataforma ONE (referência permanente)
Plataforma de cobrança, com um banco PostgreSQL separado por cliente, acessado por conectores
(podem não estar disponíveis em toda sessão/conta).

| Cliente | Conector | Schema principal |
|---|---|---|
| 99Pay | 99pay | `cob99paypr_sch` |
| Bradesco | bradesco | `cobbrapr_sch` |
| Itaú | itau | `cobitpr_sch` (+ `grlcobitpr_sch`) |
| Bellinati | bellinati | `cobbelpr_sch` |
| Boticário | boticario | `cobbotic_sch` |
| Multibase (referência/homolog) | multibase-one | `cobdemopr_sch` (+ `onereports_sch`) |
| Paschoalotto | paschoalotto | `cobpascpr_sch` |
| Porto Seguro | porto-seguro | `cobpgpr_sch` |
| Renner | renner | `cobcarpr_sch` |
| TIM | tim | `cobmbpr_sch` |

- O conector **"Laura" NÃO faz parte do ONE**. Excluir de qualquer trabalho relacionado ao ONE.
- A maioria dos bancos também tem o schema de histórico `cob_hist_sch`. Estrutura igual entre clientes, mas a quantidade de tabelas varia (270 a 406).
- Convenções:
  - PK de toda tabela: coluna única `id` (`numeric(20,0)`).
  - Sem FKs físicas (integridade na aplicação). Colunas FK seguem `fk_<abrev>_id`: `fk_cobcst_id`=cob_customer, `fk_cobctc_id`=cob_contract, `fk_cobctr_id`=cob_contractor, `fk_cobpor_id`=cob_portfolio, `fk_cobseg_id`=cob_segmentation, `fk_cobeng_id`=cob_engine, `fk_cobcmp_id`=cob_company.
  - `cob_table_relationship` (`table_from`, `table_to`, `column_from`, `column_to`, `weight`) guarda os relacionamentos da aplicação; é mais confiável que inferir pelo nome da coluna.
  - Prefixos de módulo: `cob_` (negócio), `dtl_` (regras/discador), `sec_` (segurança/usuários), `qrtz_` (Quartz), `ff4j_` (feature flags).
  - Tabelas de alto volume particionadas manualmente com sufixo `_pNNNNNNNNNNNN`: `cob_occurrence_event`, `dtl_register`, `dtl_result`.
- Tabelas centrais: `cob_customer` (devedor), `cob_contract` (dívida/contrato, ~95 colunas), `cob_contract_active`, `cob_contractor` (banco/cliente contratante, NÃO o devedor), `cob_company`, `cob_portfolio` (carteira), `cob_segmentation`/`cob_segment`, `cob_engine`/`cob_engine_schedule` (motor de régua), `cob_occurrence`/`cob_occurrence_event`, `cob_event` (parcelas financeiras), `cob_contact`/`cob_contact_value`, `cob_debt_negotiation_agreement`.
- Fatos já confirmados:
  - NID da 99Pay fica em `cob99paypr_sch.cob_contract.sent_phase` (e `cob_contract_active.sent_phase`), relação 1:N (um NID para vários contratos do mesmo cliente).
  - Cuidado com INNER JOIN com documentos: ele pode excluir silenciosamente carteiras cujos clientes não têm documento.
- Já existe uma documentação completa em PDF (`documentacao_bancos_one.pdf`, 20 páginas) com engenharia reversa dos schemas.

## Contexto recente (pode estar desatualizado)
- Tombamento para o **Importador 3.0**: Paschoalotto, Multibase 2, Boticário e Itaú concluídos. 99Pay e Bradesco estavam bloqueados (DONE1-938, SI-18692, DONE1-963). TIM, Porto Seguro e Multibase em desenvolvimento pelo PreOne, previsão de conclusão em setembro/2026.
- DX-3028: a Geração Massiva de Link da KROTON EVADIDOS (portfolio 20, multibase_one) parou após o expurgo de 15/07/2026. Havia 61.921 contratos ativos com saldo; a suspeita é a lógica de seleção/segmentação do job.
- Monto PDIs dos liderados (HXM Feedz / Performa+, metodologia 70/20/10).
- Fiz uma apresentação HTML de 30 slides sobre Claude Code para o time de dev, no visual pgmais-design.
