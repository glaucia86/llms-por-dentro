# Episódio 02: Como o contexto muda a representação

**Pergunta:** como o modelo relaciona informações de uma sequência?

**Pré-requisito:** distinguir tokens, IDs, embeddings iniciais e posição. Abrir com uma recapitulação de cinco minutos, suficiente para retomar o episódio 01.

**Objetivo:** acompanhar uma posição pelas camadas do Transformer e explicar Q, K e V como projeções aprendidas. Mostrar a máscara causal antes de usar exemplos de contextualização.

| Tempo | Conteúdo | Visual previsto |
| --- | --- | --- |
| 0–5 min | Recapitulação e sequência de entrada | Mesmo exemplo de crédito rural |
| 5–13 min | Por que uma representação inicial precisa mudar | “No sistema financeiro, o banco…” e “Na praça, o banco…” |
| 13–20 min | Camadas e hidden states | A mesma posição antes e depois de cada camada |
| 20–29 min | Self-attention e máscara causal | Quais posições cada token pode consultar |
| 29–39 min | Q/K/V e combinação ponderada | Busca, etiquetas e informação combinada |
| 39–45 min | Feed-forward, residual e limites da analogia | Uma camada como conjunto de operações |
| 45–50 min | Perguntas | Reconstrução do mecanismo |

## Critérios para produzir os slides

Em um modelo causal, a posição acessa o passado e a própria posição. Não usar palavras futuras como causa da representação de uma posição anterior. O exemplo de “banco” deve conter a pista de sentido **antes** da palavra acompanhada.

Separar embedding inicial de hidden state, e atenção de interpretação humana. Q/K/V são vetores calculados a partir da representação que chega à camada. Explicar que o Transformer contém outras operações, além de self-attention.

## Próxima produção

Criar 16 a 20 slides com revelações da máscara causal e uma matriz de atenção fictícia. Preparar um roteiro com as frases completas, limites da biblioteca como analogia e um anexo matemático opcional. **Estado atual: plano definido, slides ainda não produzidos.**
