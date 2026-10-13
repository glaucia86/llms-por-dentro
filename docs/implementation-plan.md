# Plano de implementação

**Objetivo:** entregar o repositório da série e a primeira apresentação offline.

**Arquitetura:** fonte HTML sem dependências, aparência e controles compartilhados, empacotamento com Python padrão. O arquivo distribuído incorpora todos os recursos. O roteiro deriva das notas embutidas.

**Especificação:** [design.md](design.md).

## Restrições

Português, público iniciante, 45 minutos de conteúdo e 5 de perguntas. Nenhuma chamada de rede em apresentação. Notas separadas da projeção. Somente fontes técnicas públicas na documentação distribuída.

## Verificação mais importante

1. Abertura direta do HTML, incluindo popup, com rede bloqueada.
2. Durações e exemplos coerentes entre visual e roteiro.
3. Navegação por revelações sem perder slides ou alcançar anexos involuntariamente.
4. Projeção 16:9, janela estreita e impressão sem sobreposição.
5. Ausência de fontes privadas, contatos e informações pessoais nos arquivos de entrega.

## Tarefas

- [x] Organizar README, licenças, portal e planos dos quatro episódios.
- [x] Escrever verificações dos requisitos do pacote e dos controles principais.
- [x] Produzir os 19 slides principais, três anexos e notas completas.
- [x] Implementar controles de apresentação e empacotamento autocontido.
- [x] Verificar os arquivos, renderizar slides e testar a janela da apresentadora.
- [x] Registrar a revisão, criar o commit inicial e disponibilizar o pacote.
- [x] Criar o repositório remoto privado e sincronizar os arquivos.
