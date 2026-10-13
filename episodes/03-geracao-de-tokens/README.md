# Episódio 03: Como a resposta nasce

**Pergunta:** como a última representação leva à escolha de um próximo token?

**Pré-requisito:** compreender representações contextualizadas e o vocabulário. O episódio acompanha um LLM causal de texto em geração autoregressiva comum.

**Objetivo:** distinguir logits de probabilidades, relacionar a saída ao vocabulário e reconstruir o ciclo de geração. Mostrar por que diferentes escolhas de seleção podem produzir respostas diferentes.

| Tempo | Conteúdo | Visual previsto |
| --- | --- | --- |
| 0–5 min | Recapitulação do Transformer | Vetor final da posição usada para prever |
| 5–13 min | Logits: pontuações por candidato | Vocabulário fictício pequeno |
| 13–21 min | Softmax: normalização das pontuações | Distribuição com probabilidades que somam 1 |
| 21–30 min | Escolha gulosa e amostragem | Mesma distribuição, escolhas distintas |
| 30–38 min | Temperatura, top-k e top-p | Como mudam os candidatos considerados |
| 38–45 min | Acrescentar um token e repetir | Três passos de geração e condição de parada |
| 45–50 min | Perguntas | Recapitulação visual |

## Critérios para produzir os slides

Pontuação e probabilidade têm papéis diferentes. Se mostrar números, calcular softmax e normalização de forma consistente. Temperatura modifica a distribuição de seleção, sem equivaler a um controle garantido de criatividade ou precisão. A resposta pode parar por token de término, limite de geração ou regras da aplicação.

Descrever a geração sequencial como caminho comum. Implementações com decodificação especulativa podem propor e validar vários tokens, sem serem necessárias para a explicação inicial.

## Próxima produção

Criar demonstração local com um vocabulário pequeno e distribuições calculadas, roteiro completo e um anexo de fórmulas. Não integrar um serviço externo de IA para apresentar o mecanismo. **Estado atual: plano definido, slides ainda não produzidos.**
