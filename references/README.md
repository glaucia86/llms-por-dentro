# Referências técnicas e limites dos exemplos

As explicações são autorais. As fontes abaixo sustentam os mecanismos, mas não fornecem os IDs, as segmentações ou os vetores fictícios dos desenhos. Consulta em 12 de outubro de 2026.

| Fonte primária | Uso no episódio 01 |
| --- | --- |
| [Hugging Face: Tokenization algorithms](https://huggingface.co/docs/transformers/tokenizer_summary) | Subwords e diferenças gerais entre BPE, WordPiece e Unigram |
| [Hugging Face: The tokenization pipeline](https://huggingface.co/docs/tokenizers/pipeline) | Etapas de preparação e representação da sequência |
| [PyTorch: Embedding](https://docs.pytorch.org/docs/stable/generated/torch.nn.Embedding.html) | Lookup de índices em uma tabela de vetores aprendidos |
| [Hugging Face: Model outputs](https://huggingface.co/docs/transformers/main_classes/output) | Distinção entre embeddings de entrada e hidden states das camadas |
| [Hugging Face: Chat templates](https://huggingface.co/docs/transformers/chat_templating) | Estrutura de mensagens e tokens de controle compatíveis com o modelo |

## Como ler os desenhos

“Explique crédito rural.” usa a divisão fictícia `[Explique][␠crédito][␠ru][ral][.]`. O símbolo `␠` torna o espaço visível no desenho. O token e o ID fazem parte do mesmo vocabulário fictício durante todo o episódio. A ordem da sequência é preservada.

A matriz usa quatro dimensões somente para caber na projeção. Nenhuma dimensão recebe um significado humano fixo, e os valores não vieram de um modelo real. Um embedding inicial serve como representação aprendida de entrada. As camadas seguintes calculam representações dependentes do contexto acessível à posição.

## Simplificações assumidas

- O desenho separa “tokens” e “IDs” para ensinar os papéis. Um tokenizer real costuma entregar os IDs na mesma operação de codificação.
- A visão das três famílias apresenta a intuição do aprendizado do vocabulário. O caminho de codificação da entrada e detalhes das implementações variam.
- Espaços, sinais, acentos e caracteres incomuns podem afetar a segmentação, sem uma divisão universal.
- A incorporação de posição varia por arquitetura. Nem todo modelo soma um vetor de posição ao embedding.
- O episódio mostra tokens textuais. Modelos multimodais também processam outras modalidades.
- Embeddings de tokens e embeddings de texto para recuperação compartilham a ideia de vetor, mas têm unidades e usos diferentes.

Para mostrar uma contagem real em encontros futuros, registrar modelo, tokenizer, versão, entrada exata e configuração de tokens especiais. Nunca rotular o desenho fictício como resultado medido.
