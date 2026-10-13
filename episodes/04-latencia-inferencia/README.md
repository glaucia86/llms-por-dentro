# Episódio 04: Por que a resposta demora

**Pergunta:** o que acontece entre enviar uma pergunta, ver a resposta começar e vê-la terminar?

**Pré-requisito:** conhecer o ciclo de geração do próximo token e o papel de K/V. Abrir com uma reconstrução breve desse ciclo.

**Objetivo:** distinguir processamento do prompt e geração, explicar o que o KV cache reaproveita e definir métricas com fronteiras de medição explícitas.

| Tempo | Conteúdo | Visual previsto |
| --- | --- | --- |
| 0–5 min | Recapitulação e relógio do usuário | Envio, primeiro token e fim |
| 5–15 min | Prefill e primeiro token | Processamento do prompt conhecido |
| 15–25 min | Decode e KV cache | Reaproveitamento de chaves e valores anteriores |
| 25–35 min | TTFT, intervalos e latência total | Linha do tempo com eventos definidos |
| 35–42 min | Tokens por segundo, throughput e filas | Uma requisição versus capacidade agregada |
| 42–45 min | Escolhas de aplicação | Tamanho de contexto, saída e transmissão progressiva |
| 45–50 min | Perguntas | Identificação de gargalos |

## Critérios para produzir os slides

KV cache guarda chaves e valores calculados em camadas do modelo. Não tratá-lo como armazenamento de respostas completas. Distinguir cache de prefixo compartilhado entre requisições de cache de K/V dentro da sequência.

Definir TTFT pelo ponto observado: servidor ou usuário. Fila, transporte e processamento da aplicação podem contribuir para a espera percebida. Primeiro token gerado e primeiro texto visível podem ser eventos distintos, devido a decodificação, buffering ou tokens sem representação visível.

Definir tokens por segundo por requisição ou de modo agregado. Mostrar intervalos entre tokens separadamente da latência total. Comparações devem registrar tamanho do prompt e da saída, concorrência, hardware e percentis.

## Próxima produção

Criar uma linha do tempo interativa com valores fictícios coerentes e um roteiro sobre experiência do usuário. A cobertura de métricas deverá ser ampliada com fontes públicas, pois o material-base disponível aborda apenas a introdução dessa aula. **Estado atual: plano definido, slides ainda não produzidos.**
