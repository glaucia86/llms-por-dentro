# Verificação da entrega inicial

Verificação em 12 de outubro de 2026.

## Conteúdo e pacote

- 18 slides de conteúdo: 2.700 segundos, equivalentes a 45 minutos.
- Um slide de perguntas: 300 segundos, equivalentes a 5 minutos.
- Três anexos opcionais, fora da sequência e da duração principal.
- Notas em todos os 22 slides, com cerca de 5.300 palavras.
- Sete verificações de estrutura e pacote passaram.
- Sintaxe JavaScript e reconstrução determinística do HTML passaram.

## Verificação em navegador

O HTML autocontido foi aberto diretamente como arquivo local em Chromium, com a rede desativada. Os testes verificaram avanço, retorno, revelações, parada no slide de perguntas, acesso aos anexos, pausa da projeção e seleção de vetores na tabela.

O popup da apresentadora abriu no modo de arquivo local. As notas apareceram somente nessa janela. Controles e relógio funcionaram. O texto das notas preservou a rolagem ao avançar uma revelação do mesmo slide.

Todos os slides foram renderizados e inspecionados. Após corrigir o dimensionamento de dois elementos em telas estreitas, os 22 slides passaram pela verificação de limites em 1.440 px e 375 px. A execução não registrou erros de JavaScript nem requisições de recursos externos.

A impressão em A4 paisagem gerou 19 páginas. Notas, controles e anexos ficaram ocultos. As páginas foram renderizadas para inspeção visual. O teste de layout não substitui um ensaio da fala nem a conferência do popup no navegador corporativo.

## Revisão

Uma revisão independente leu o material, os controles, a aparência e o empacotamento. Não encontrou problemas conceituais ou funcionais importantes na leitura estática. Duas inconsistências menores do guia de ensaio foram corrigidas: o marco final do slide 05 é 12 minutos, e o percurso abreviado tem 40 minutos de conteúdo mais 5 de perguntas.

## Repositório remoto

O projeto está em [glaucia86/llms-por-dentro](https://github.com/glaucia86/llms-por-dentro), criado como privado. O material inclui os planos dos quatro episódios e o episódio 01 completo. Nenhum site foi publicado.


## Atualização ELI5 e Pages — 13/10/2026

- `python3 scripts/build_site.py`: gerou a apresentação autocontida, o roteiro e o pacote público.
- `python3 tests/verify.py`: 7 verificações passaram; 19 slides principais, 45 + 5 minutos e 3 anexos.
- `python3 tests/verify_site.py`: 2 verificações passaram; somente os arquivos de publicação previstos, sem links locais quebrados ou caminhos absolutos incompatíveis com um site de projeto.
- `node --check shared/js/deck.js`: passou.
- `tests/browser-check.cjs`, com Playwright e Chromium locais: navegação, revelações, consulta de embeddings, roteiro, cronômetro, impressão e todos os 22 slides em 1440 px e 375 px passaram. Nenhum erro de JavaScript ou requisição remota.
- `tests/pages-browser-check.cjs`: o portal, a apresentação, recarga com fragmento, notas e ambas as prévias da apresentadora funcionaram por HTTP sob `/llms-por-dentro/`. Nenhuma resposta de erro ou requisição externa.
- Inspeção visual dos slides alterados: a analogia mantém os números e as ressalvas técnicas legíveis. O marcador de espaço é desenhado por CSS para não depender da cobertura de caracteres da fonte.
