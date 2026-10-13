# Projeto e critérios de entrega

A série apresenta o funcionamento de LLMs a um público iniciante em quatro encontros de 50 minutos. O episódio 01 deve servir à apresentação de 13 de outubro de 2026, com 45 minutos de conteúdo, 5 minutos de perguntas, texto projetado curto e roteiro detalhado em português. O material é educacional independente, com exemplos fictícios de crédito rural.

## Componentes

- Portal local com os quatro encontros e seus estados reais.
- Episódio 01 em HTML 16:9, com 18 slides de conteúdo, 1 de perguntas e 3 anexos opcionais.
- Slides fonte com notas embutidas, CSS e JavaScript compartilhados.
- HTML autocontido em `dist/`, que abre por `file://` sem rede.
- Roteiro Markdown derivado das mesmas notas dos slides.
- Planos de aula para os episódios 02 a 04, sem apresentações ficticiamente marcadas como concluídas.

## Comportamento

Setas e botões navegam por slides e revelações. Uma janela separada reúne notas, tempo, slide atual e prévia do seguinte. Índice, ajuda e pausa não revelam as notas na projeção. A versão sem JavaScript continua legível. A impressão mostra os slides e oculta notas e controles. As durações principais somam 3.000 segundos.

## Conteúdo

A história percorre “Explique crédito rural.” até os vetores de entrada. Vocabulário e vetores são fictícios e consistentes nos exemplos. Não confundir IDs com significado, vetores iniciais com representações contextualizadas ou embeddings de tokens com embeddings de documentos. A posição aparece como requisito da sequência, sem ensinar uma implementação universal de posição.

## Decisões

O motor usa HTML/CSS/JavaScript nativos para eliminar downloads e a exigência de servidor local na reunião. Recursos opcionais só entram se ajudarem a explicar ou apresentar. O projeto começa privado e não publica um site automaticamente. Código e conteúdo têm licenças distintas.


## Atualização ELI5 e GitHub Pages — 13/10/2026

A mesma analogia acompanha a aula: peças de texto (tokens), etiquetas do catálogo (IDs) e fichas numéricas aprendidas (embeddings). Os slides 04, 05, 10, 13 e 17 tornam esses objetos visíveis; os nomes técnicos aparecem junto da explicação em linguagem comum. Os verbos juntar, avaliar e enxugar orientam a leitura das famílias de tokenização. Os IDs e vetores fictícios permanecem consistentes, e as dimensões não recebem rótulos semânticos humanos. Mantemos os 45 minutos de conteúdo, 5 de perguntas e três anexos opcionais.

O portal e a apresentação são publicados no GitHub Pages, mantendo o repositório privado. O pacote `_site/` contém somente `index.html`, `shared/css/theme.css`, `dist/episodio-01.html` e `.nojekyll`. O HTML incorpora as notas necessárias à janela da apresentadora; essas notas também podem ser lidas no código do site público. A lista explícita evita publicar documentos de planejamento ou testes. O workflow de Pages verifica o conteúdo antes da publicação e usa o ambiente `github-pages`.
