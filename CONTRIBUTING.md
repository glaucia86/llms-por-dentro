# Como contribuir

Correções conceituais, melhorias de acessibilidade e exemplos mais claros são bem-vindos. Abra uma issue descrevendo qual slide ou trecho precisa mudar, por que isso melhora a compreensão e qual fonte primária sustenta a alteração técnica.

Preserve o português simples, o tempo de 50 minutos por encontro e a separação entre o visual projetado e o roteiro da apresentadora. Dê um nome técnico somente depois de construir a intuição. Diga onde cada analogia deixa de funcionar.

Exemplos que mostram segmentações, IDs ou vetores devem identificar o tokenizer/modelo realmente executado ou trazer o rótulo “exemplo fictício”. Use exemplos autorais e dados inventados nas histórias.

Após editar os slides ou os controles:

```bash
python3 scripts/build.py
python3 tests/verify.py
```

Abra a versão em `dist/` sem internet e confira a navegação, o popup da apresentadora e a impressão. Revise o texto em projeção 16:9 e em uma janela estreita. Descreva no pull request a mudança e como a verificou.
