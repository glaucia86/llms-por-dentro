# Vídeo ELI5 — Episódio 01

**Estado:** roteiro e storyboard preparados. Narração e MP4 ainda não produzidos. As legendas têm tempos planejados; a sincronização final depende do áudio.

**Duração planejada:** 3 minutos. **Idioma:** português brasileiro. **Formato:** horizontal 1920 × 1080, 30 fps.

Objetivo: um vídeo curto para apoiar a explicação de tokens, IDs e embeddings, mantendo os limites técnicos da aula. A palestra continua com 45 minutos de conteúdo e 5 de perguntas; o vídeo deve substituir uma recapitulação ou parte da exposição, sem acrescentar três minutos ao encontro.

## Direção visual

Fundo azul muito escuro, halos discretos em verde-água e violeta, peças de texto e etiquetas legíveis, setas que indicam a ordem do processo. A animação revela uma ideia por vez, com pequenos deslocamentos e aproximações para orientar a atenção. Sem flashes ou câmera contínua. As fichas numéricas são desenhos precisos, sem nomes semânticos inventados nas dimensões.

A referência fornecida é um vídeo de aproximadamente 3min37s sobre KV cache. A inspiração aqui é sua linguagem visual; o roteiro e os desenhos deste projeto são autorais e tratam somente da primeira aula.

## Storyboard e fala

### 00:00–00:12 · A pergunta

**Visual:** A frase aparece no centro. Uma linha luminosa aponta para uma caixa ainda fechada.

**Narração:** Quando você escreve uma pergunta para uma inteligência artificial, o texto passa por uma preparação. Vamos acompanhar esse começo com uma ideia simples: uma caixa de peças.

### 00:12–00:34 · As peças

**Visual:** A frase “Explique crédito rural.” se separa em cinco peças. Rural vira ru e ral. O espaço ganha um pequeno marcador.

**Narração:** Nossa pergunta é: explique crédito rural. Um componente chamado tokenizer aplica regras para organizar o texto em unidades. Essas unidades são os tokens. Pense em peças de texto que podem ser reutilizadas. No nosso desenho inventado, três palavras ocupam cinco peças.

### 00:34–00:54 · O catálogo

**Visual:** A caixa mostra duas divisões fictícias para rural, em cenas alternadas. Evitar mostrar ambas como saídas do mesmo tokenizer.

**Narração:** Uma peça pode ser uma palavra inteira, uma parte de palavra ou um sinal. A divisão depende do catálogo e das regras do tokenizer. Por isso, precisamos usar o tokenizer compatível com o modelo. Os exemplos deste vídeo são fictícios.

### 00:54–01:16 · As etiquetas

**Visual:** Etiquetas entram de cima, uma por peça: 42, 8, 73, 19, 5. A peça com espaço + crédito é destacada.

**Narração:** Cada entrada do catálogo tem um número que a identifica. Esse número é o ID do token. A peça crédito, com o espaço antes dela, recebe a etiqueta oito no nosso exemplo. As outras peças têm suas próprias etiquetas.

### 01:16–01:36 · O papel do ID

**Visual:** A etiqueta 8 aponta para a entrada do catálogo. Uma etiqueta 9 aponta para outra entrada sem qualquer ligação semântica sugerida.

**Narração:** A etiqueta ajuda a localizar uma entrada. O número oito não contém o significado de crédito. E números próximos não garantem conteúdos parecidos. Pense no número de um item no catálogo: ele indica qual item procurar.

### 01:36–01:58 · A ficha numérica

**Visual:** A linha do ID 8 se ilumina na tabela. Dela sai uma ficha com 0,20; −0,10; 0,70; 0,30.

**Narração:** Agora usamos a etiqueta para buscar uma ficha de números. No modelo, essa ficha é um vetor aprendido, chamado embedding de token. O ID seleciona uma linha de uma tabela. O que encontramos é a lista de números daquela entrada.

### 01:58–02:24 · Onde a analogia para

**Visual:** As quatro posições da ficha se acendem, com rótulos dimensão 1 a 4. O treinamento aparece como origem da tabela; a pergunta atual apenas consulta.

**Narração:** Esses números foram aprendidos durante o treinamento. Eles não são campos preenchidos por uma pessoa, como dinheiro ou agricultura. Uma dimensão isolada não tem, em geral, um significado humano fixo. Mostramos quatro números para caber na tela; modelos reais podem usar muito mais dimensões.

### 02:24–02:44 · A porta do Transformer

**Visual:** As cinco fichas seguem em sequência até uma porta marcada Transformer. O detalhe de contexto fica para o próximo episódio.

**Narração:** Para cada token, buscamos seu vetor inicial. A sequência de vetores segue para o Transformer, usando também informações de posição conforme a arquitetura. É nas próximas etapas que as relações com o contexto serão processadas. Esse é o assunto do próximo encontro.

### 02:44–03:00 · Recapitulação

**Visual:** Peça → etiqueta → ficha numérica, cada objeto reaparece uma vez. Encerrar com a série e o nome da autora.

**Narração:** Guarde três papéis: o token é a peça de texto. O ID é sua etiqueta no catálogo. O embedding é a ficha de números aprendidos. Esse é o primeiro trecho do caminho: do texto à entrada numérica do modelo.

## Produção e verificação

A narração deve usar uma voz neutra em português brasileiro ou uma gravação da autora. Não imitar a voz do vídeo de referência. Após receber o áudio, ajustar a duração de cada cena, sincronizar as legendas e exportar o MP4 com legendas visíveis, além do SRT separado.

Conferir a sequência 42, 8, 73, 19, 5, o vetor do ID 8, as indicações de exemplos fictícios e os limites da analogia. Revisar pronúncia de tokenizer, token e embedding e garantir que as legendas não cubram as peças ou a tabela.

O site atual publica somente o portal e o HTML da palestra. Este roteiro não faz parte do pacote público. O vídeo só entra no site quando estiver produzido e revisado.
