# LLMs por Dentro

**Do texto à resposta: uma série visual para entender modelos de linguagem.**

Material em português para quem usa IA e quer compreender o que acontece dentro de um LLM. Cada encontro começa com uma ideia familiar, mostra o mecanismo com um desenho e apresenta o termo técnico. Nenhum conhecimento de aprendizado de máquina é necessário.

Criação e apresentação: **Glaucia Lemos**, Principal Software Engineer e AI Transformation Lead.

## Os quatro encontros

Cada encontro reserva 45 minutos para conteúdo e 5 minutos para perguntas. A frequência sugerida é mensal, com datas dos próximos encontros a definir.

| Episódio | Pergunta central | Conteúdo | Estado |
| --- | --- | --- | --- |
| [01. Do texto aos números](episodes/01-texto-aos-numeros/README.md) | Como uma pergunta entra no modelo? | Tokenização, subwords, IDs e embeddings de tokens | Apresentação e roteiro prontos |
| [02. Como o contexto muda a representação](episodes/02-contexto-transformers/README.md) | Como as palavras passam a se relacionar? | Transformer, hidden states, self-attention, Q/K/V e máscara causal | Plano de aula definido |
| [03. Como a resposta nasce](episodes/03-geracao-de-tokens/README.md) | Como o modelo escolhe o próximo token? | Logits, softmax, estratégias de seleção e geração autoregressiva | Plano de aula definido |
| [04. Por que a resposta demora](episodes/04-latencia-inferencia/README.md) | O que acontece enquanto esperamos? | Prefill, decode, KV cache, TTFT e métricas de serving | Plano de aula definido |

O foco é a inferência de LLMs de texto causais, que geram a resposta em sequência. Outros tipos de modelo podem organizar o processamento de modo diferente.

## Apresentar o episódio 01

1. Abra o [portal da série](https://glaucia86.github.io/llms-por-dentro/) e clique em **Abrir apresentação**.
2. Use Edge, Chrome ou Firefox. Para apresentar sem internet, baixe [episodio-01.html](dist/episodio-01.html) pelo botão **Download raw file** e abra o arquivo local.
3. Use as setas ou os botões para avançar. Quando houver uma revelação, o primeiro avanço revela a informação e o seguinte muda o slide.
4. Pressione **S** ou clique em **Apresentadora** para abrir o roteiro em outra janela. Permita o popup se o navegador bloquear.
5. Na reunião, compartilhe **apenas a janela dos slides**. A janela da apresentadora contém a fala completa, o tempo sugerido, o próximo slide e controles.

| Atalho | Ação |
| --- | --- |
| `→`, `Page Down`, espaço | Revelar ou avançar |
| `←`, `Page Up` | Voltar |
| `Home`, `End` | Primeiro slide ou perguntas |
| `S` | Abrir a janela da apresentadora |
| `F` | Entrar ou sair da tela cheia, quando permitida pelo navegador |
| `O` | Abrir o índice de slides |
| `B` | Escurecer a projeção durante uma pausa |
| `H` | Exibir ajuda |
| `Esc` | Fechar índice, ajuda ou pausa |

O conteúdo abre como documento contínuo se JavaScript estiver desativado. Use a impressão do navegador para gerar um PDF dos slides. O roteiro está também em [speaker-notes.md](episodes/01-texto-aos-numeros/speaker-notes.md), para consulta quando popups não forem permitidos.

## Estrutura

```text
llms-por-dentro/
├── index.html                 # portal da série
├── episodes/                  # um diretório por encontro
│   ├── 01-texto-aos-numeros/   # slides, plano e roteiro completo
│   ├── 02-contexto-transformers/
│   ├── 03-geracao-de-tokens/
│   └── 04-latencia-inferencia/
├── shared/                    # aparência e controles reutilizáveis
│   ├── css/theme.css
│   └── js/deck.js
├── dist/episodio-01.html       # versão autocontida para apresentar
├── references/README.md       # fontes públicas e limites didáticos
├── scripts/build.py           # empacota slides e extrai o roteiro
├── tests/                     # verificação dos controles e do pacote
└── docs/                      # decisões, plano da série e ensaio
```

O workflow `validate.yml` verifica o pacote e o JavaScript a cada push ou pull request. O workflow `pages.yml` publica o portal e a apresentação no GitHub Pages a partir de `main`, após verificar o conteúdo. `scripts/build_site.py` monta `_site/` com uma lista explícita de arquivos públicos.

## Editar e verificar

Edite `episodes/01-texto-aos-numeros/index.html`. Cada `section.slide` contém o visual, a duração em segundos e um `aside.notes` com o roteiro. CSS e JavaScript ficam em `shared/`. A versão para apresentação incorpora esses recursos no próprio HTML.

```bash
python3 scripts/build.py
python3 tests/verify.py

# Preparar e conferir o site
python3 scripts/build_site.py
python3 tests/verify_site.py
```

O empacotamento usa somente a biblioteca padrão do Python. Os controles usam JavaScript nativo. A opção por um motor pequeno, em vez de um framework de slides, permite que os slides e as notas funcionem por abertura direta de arquivo, inclusive sem acesso a CDNs.

Para uma verificação adicional, quem já tem Playwright e Chromium instalados pode executar `node tests/browser-check.cjs`. O teste abre o HTML com a rede desativada e confere navegação, lookup, notas, relógio, celular e impressão. Essas ferramentas são opcionais e não são necessárias para apresentar.

## Convenções didáticas

Segmentações, IDs e vetores dos desenhos são **exemplos fictícios**, identificados nos slides. Eles explicam o mecanismo e não simulam um tokenizer comercial. Para contar tokens reais, use o tokenizer e a configuração compatíveis com o modelo escolhido.

A aula 1 segue uma analogia visual contínua: peça de texto → etiqueta no catálogo → ficha numérica. As analogias têm limites explícitos no roteiro. Embeddings iniciais de tokens não equivalem a embeddings de documentos para busca. IDs identificam entradas do vocabulário, e a proximidade numérica de dois IDs não mede semelhança de significado.

## Licenças e colaboração

O código usa [MIT](LICENSE). Slides, roteiros, planos de aula e ilustrações didáticas autorais usam [CC BY 4.0](LICENSE-CONTENT.md). Fontes citadas mantêm suas próprias licenças.

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para propor correções ou novos exemplos. Os episódios 02 a 04 têm planos completos de escopo, mas suas apresentações ainda serão produzidas. O repositório permanece privado. O portal e o episódio 01 são publicados como um site público, incluindo as notas incorporadas ao HTML para a janela da apresentadora. Os demais arquivos do repositório não fazem parte do pacote de publicação.
