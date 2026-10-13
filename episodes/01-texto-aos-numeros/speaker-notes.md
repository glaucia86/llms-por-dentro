# Episódio 01: roteiro da apresentadora

45 minutos de conteúdo e 5 minutos de perguntas. Três anexos ficam fora do tempo principal.

O roteiro abaixo deriva das notas dos slides. Para alterá-lo, edite o `aside.notes` no HTML fonte e execute `python3 scripts/build.py`.

Compartilhe somente a janela dos slides. Pressione S para abrir as notas em outra janela. As setas revelam informações antes de avançar quando houver uma revelação.

## Slide 01: LLMs por Dentro

Duração sugerida: 1 min. Referência acumulada: 0–1 min.

### Fala sugerida

“Quando enviamos uma pergunta para uma IA, parece que ela lê a frase e começa a responder. Hoje vamos abrir a primeira parte desse caminho. Vamos acompanhar uma pergunta sobre crédito rural e ver como o texto se torna uma sequência de números que o modelo consegue processar.

Vocês não precisam conhecer matemática de redes neurais nem ter programado uma aplicação de IA. Eu vou apresentar cada ideia com um desenho, e depois dar o nome técnico. Ao final, quero que consigamos distinguir três coisas: o pedaço de texto, o número que identifica esse pedaço e a representação numérica que a rede utiliza.”

### Condução

Faça a abertura em cerca de um minuto. Apresente a série como quatro encontros, sem listar todas as siglas agora. Diga que os exemplos são inventados para ensinar o mecanismo. Reserve os cinco minutos finais para perguntas. Se alguém fizer uma pergunta muito avançada, acolha e diga em qual encontro ela será explorada.

### Transição

“Primeiro, vou mostrar onde o encontro de hoje se encaixa na história completa.”

## Slide 02: Uma pergunta, quatro encontros

Duração sugerida: 2 min. Referência acumulada: 1–3 min.

### Fala sugerida

“Nossa história tem quatro partes. Hoje, a pergunta se transforma em uma entrada numérica. No segundo encontro, vamos ver como o modelo relaciona os elementos da sequência. No terceiro, veremos como ele escolhe uma unidade da resposta e repete esse processo. No quarto, vamos olhar para o tempo que tudo isso leva.

Um modelo de linguagem grande, ou LLM, é uma rede neural treinada com grandes conjuntos de dados. Aqui, vamos acompanhar um tipo muito comum: o modelo de texto que gera sua resposta em sequência. A aplicação que usamos pode ter busca, ferramentas e várias outras etapas. Nosso desenho começa no texto que será enviado ao modelo.

A razão de dividir o assunto é simples: cada explicação usa uma ideia do encontro anterior. Se eu explicar todas as siglas hoje, teremos uma lista para decorar. Nosso objetivo é conseguir reconstruir o caminho e saber o papel de cada peça.”

### Pausa e verificação

Peça que observem o primeiro item destacado. Diga: “Hoje nossa história termina na entrada do Transformer.” Não faça uma aula antecipada sobre atenção ou latência. Se perguntarem o que é Transformer, responda: “É a arquitetura que vai processar essas representações e relacionar a sequência. Vamos abrir essa parte no encontro seguinte.”

### Transição

“Vamos começar com algo que todos já fizeram: escrever uma pergunta.”

## Slide 03: Começamos com uma pergunta

Duração sugerida: 2 min. Referência acumulada: 3–5 min.

### Fala sugerida

“Imagine que alguém abre um assistente e escreve: Explique crédito rural. Para nós, a frase já sugere um tema, uma intenção e o tipo de resposta que esperamos. Para chegar à rede neural, ela ainda precisa de uma preparação.

Na prática, a aplicação pode juntar a pergunta com instruções, histórico da conversa e outros textos. Para o desenho ficar claro, vamos acompanhar somente esta frase. Portanto, o caminho que veremos vale para o texto que efetivamente entra no modelo, e não apenas para o que aparece na caixinha de conversa.

Também precisamos distinguir uma aplicação de IA do modelo que ela utiliza. A aplicação cuida da interface, pode buscar documentos e organiza a requisição. O modelo é o componente que processa sua entrada e produz a continuação. Nosso foco hoje está na fronteira entre o texto preparado e a entrada numérica da rede.”

### Interação curta

“Antes de qualquer desenho: essa frase tem três palavras. Será que isso significa três tokens?” Deixe duas ou três pessoas responderem por alguns segundos. Não cobre justificativas. Diga que vão retomar essa pergunta assim que virem a tokenização. A pausa ajuda a tornar visível a intuição inicial de contar palavras.

### Transição

“O primeiro componente desse caminho escolhe unidades do texto. Vamos conhecer esse componente.”

## Slide 04: Como uma caixa de peças de texto

Duração sugerida: 3 min. Referência acumulada: 5–8 min.

### Fala sugerida

“Vou usar a ideia de uma caixa de peças. O desenho mostra uma divisão inventada da nossa pergunta. O símbolo ␠ torna o espaço visível; no próximo slide vamos contar cada peça com calma. Em vez de precisar de uma peça diferente para cada frase possível, conseguimos construir muitas frases combinando unidades menores. O tokenizer trabalha com um vocabulário finito: um conjunto de unidades que ele sabe representar.

O texto entra, o tokenizer aplica suas regras e produz uma sequência dessas unidades. Nós chamamos cada unidade de token e o processo de tokenização. O vocabulário e o algoritmo determinam quais peças podem aparecer e como o texto é representado.

Essa etapa pode envolver outras operações de preparação, dependendo da implementação. Para começar, o que precisamos guardar é a relação entre o texto e a sequência de unidades. Elas podem ser palavras inteiras, partes de palavras, sinais ou unidades baseadas em bytes. Nem sempre uma unidade tem um significado isolado que faça sentido para nós.

Por isso é importante usar o tokenizer certo para o modelo. É como preparar uma entrada usando o catálogo que aquele modelo espera. Trocar o catálogo sem considerar o modelo pode fazer os mesmos números apontarem para coisas diferentes.”

### Limite da analogia

As peças ajudam a visualizar unidades reutilizáveis. Não diga que o tokenizer lê a intenção, escolhe ideias ou compreende o crédito rural. Ele aplica um procedimento de codificação. A rede neural fará o processamento das representações depois.

### Pausa

Pergunte: “Qual parte desta etapa escolhe a divisão?” Resposta esperada: o tokenizer, com seu vocabulário e suas regras. Dê dez segundos e retome o desenho.

### Transição

“Agora vamos abrir a sequência que poderia sair dessa etapa.”

## Slide 05: Uma palavra pode ocupar várias peças

Duração sugerida: 4 min. Referência acumulada: 8–12 min.

### Fala sugerida

“Voltemos à nossa frase. Vou separar as unidades de um exemplo inventado. Atenção: esta divisão não veio de um tokenizer real. Ela serve para enxergar o mecanismo.” Avance uma vez para revelar as cinco peças.

“Aqui, Explique aparece inteiro. O espaço antes de crédito faz parte da próxima peça. Rural se divide em duas peças, uma com espaço seguido de ru e outra com ral. O ponto ocupa uma peça própria. Isso já mostra por que a quantidade de palavras não determina a quantidade de tokens.”

Avance para revelar a legenda. “Este símbolo parecido com uma caixinha representa um espaço. Estou tornando algo invisível visível no desenho. Tokenizers podem incluir o espaço na unidade, separá-lo ou representá-lo com convenções próprias. O símbolo do slide é uma convenção didática.”

Avance para a frase de conclusão. “Contamos três palavras e, nesta divisão fictícia, cinco tokens. Outra divisão poderia manter rural inteiro, dividir Explique ou agrupar os sinais de outra maneira. O resultado depende do vocabulário e das regras do tokenizer.”

### Demonstração com a mão

Aponte para cada peça da esquerda para a direita. Faça um pequeno espaço entre os gestos em “ru” e “ral”. Depois passe a mão pela palavra rural no texto original. Isso ajuda a separar a palavra que lemos das unidades usadas para representá-la.

### Verificação

“Se eu acrescentar uma vírgula, posso assumir que o número de tokens fica igual?” Resposta esperada: não podemos garantir, precisamos codificar a entrada com o tokenizer correto. A nova pontuação pode alterar a segmentação, embora não haja uma regra universal de um sinal para um token.

### Transição

“Vamos ver por que dois catálogos podem dividir a mesma frase de modos diferentes.”

## Slide 06: O catálogo muda a divisão

Duração sugerida: 3 min. Referência acumulada: 12–15 min.

### Fala sugerida

“Imaginem duas caixas de peças. Na caixa A, encontramos ru e ral. Na caixa B, existe uma peça rural inteira. A mesma palavra pode ser montada de duas maneiras. Agora vou mostrar a segunda caixa.” Revele o lado direito.

“Cada tokenizer tem um vocabulário e uma maneira de aplicar esse vocabulário. O processo de aprendizado das unidades também pode ter usado textos com características diferentes. Por isso, idiomas, palavras e formatos podem ocupar quantidades de tokens distintas, dependendo do tokenizer.

Nos exemplos, estamos inventando duas caixas para destacar essa dependência. Não estamos comparando dois fornecedores nem medindo a qualidade de modelos. Uma divisão menor, sozinha, não garante uma resposta melhor. Temos várias decisões de arquitetura, treinamento e uso além da tokenização.”

### Aplicação prática

“Quando uma aplicação tem um limite de tokens, contar palavras é apenas uma estimativa grosseira. Se preciso de uma contagem precisa, uso a codificação compatível com o modelo e com a configuração da requisição. A entrada efetiva pode incluir histórico e marcadores que também ocupam espaço.”

### Onde a analogia para

As peças não são sempre pedaços que reconhecemos visualmente. Alguns tokenizers usam bytes e símbolos internos para apresentar as unidades. Mantenha a ideia de representação, sem prometer que todo token corresponde a uma parte linguística fácil de ler.

### Transição

“Mas por que dividir palavras? Por que a caixa não tem uma peça para toda palavra possível?”

## Slide 07: Peças menores ajudam a representar mais palavras

Duração sugerida: 3 min. Referência acumulada: 15–18 min.

### Fala sugerida

“Vejam estas palavras. Elas compartilham trechos. Se o catálogo tiver somente palavras inteiras, ele precisará de entradas separadas para muitas variações. Também será difícil representar todas as palavras novas, combinações ou grafias que apareçam.

Uma solução é utilizar unidades menores que palavras. O nome técnico é subwords. Com peças reutilizáveis, conseguimos representar várias palavras sem ter uma entrada inteira para cada uma.” Revele o lado direito e aponte para program e as terminações.

“Estou usando uma família de palavras para o desenho ficar intuitivo. A divisão real não precisa seguir a análise gramatical da língua. O tokenizer aprende padrões estatísticos e aplica suas regras. Pode existir uma peça programa, uma peça pro, uma peça que começa com espaço ou qualquer outra unidade permitida pelo vocabulário.”

### Explique a escolha de tamanho

“Se a unidade for muito grande, o catálogo cresce. Se a unidade for muito pequena, como caracteres isolados, a sequência pode ficar longa. As unidades intermediárias oferecem uma maneira de combinar reutilização e tamanho da sequência. Os detalhes dessa escolha dependem do treinamento e da implementação.”

### Verificação

Pergunte: “Precisamos ter uma peça inteira para cada palavra que alguém possa inventar?” Esperado: não, podemos compor muitas palavras com unidades menores. Evite prometer que todo tokenizer representa qualquer entrada sem token desconhecido. Alguns usam uma cobertura de bytes ou mecanismos de fallback, outros têm limitações.

### Transição

“Há diferentes estratégias para aprender esse catálogo de peças. Vou dar apenas a ideia de três delas.”

## Slide 08: Há vários jeitos de preparar a caixa

Duração sugerida: 4 min. Referência acumulada: 18–22 min.

### Fala sugerida

“Não precisamos memorizar algoritmos hoje. Quero mostrar que o catálogo pode ser aprendido de formas diferentes. Esta comparação fala da preparação do vocabulário a partir de muitos textos. Não significa que o tokenizer treina um catálogo novo toda vez que recebemos uma pergunta.

No BPE, começamos com unidades pequenas e aprendemos combinações, normalmente juntando pares adjacentes que aparecem com frequência nos dados. O desenho ru ilustra uma possível combinação, sem representar um corpus real. Depois de treinado, o tokenizer usa o vocabulário e as regras aprendidas para codificar novas entradas.”

Revele WordPiece. “O WordPiece também pode ser entendido como uma construção de unidades menores para maiores, mas o critério de escolha considera uma medida estatística da combinação. Não basta olhar apenas para o par mais frequente. Implementações e reconstruções didáticas podem detalhar esse treinamento de formas diferentes. Na codificação, uma abordagem comum busca a maior peça disponível a partir da posição atual.”

Revele Unigram. “O Unigram começa com várias unidades candidatas e um modelo probabilístico. O treinamento remove unidades que pouco contribuem, mantendo um vocabulário menor. Para representar uma entrada, ele considera as possibilidades de segmentação e seus scores. É possível selecionar a segmentação mais provável ou usar amostragem em certas configurações.”

### Limite e tempo

Apresente os verbos primeiro: juntar, avaliar, enxugar. Diga os nomes técnicos como referências para reconhecer depois. Não peça que a plateia memorize as três famílias. Não entre em fórmulas de frequência, loss ou programação dinâmica. A mensagem principal é a construção e o uso de unidades reutilizáveis. Reserve uns trinta segundos para perguntar se a diferença entre aprender o vocabulário e aplicar o tokenizer ficou clara.

### Se o tempo apertar

Explique BPE e diga que as outras duas famílias aprendem a seleção de unidades por critérios diferentes. Economize dois minutos aqui, preservando a afirmação de que o tokenizer é preparado antes de codificar a nossa entrada.

### Transição

“Até aqui acompanhamos texto comum. Conversas também precisam indicar quem está falando e onde cada mensagem termina.”

## Slide 09: Uma conversa também tem estrutura

Duração sugerida: 2 min. Referência acumulada: 22–24 min.

### Fala sugerida

“Numa conversa, além do conteúdo, precisamos indicar quem enviou uma mensagem e onde ela começa ou termina. Muitos modelos usam formatos específicos de chat e tokens de controle para organizar isso.

O desenho mostra a estrutura, a pergunta e a fronteira final. Não são nomes reais de tokens de um serviço. É uma forma de visualizar que o texto digitado pela pessoa pode ser só parte da entrada codificada. Instruções e histórico também podem entrar nessa composição.

Um token especial pode sinalizar início, fim ou outro controle compatível com o modelo. Nem toda palavra mostrada no desenho é, necessariamente, um token especial no formato real. O ponto é que a aplicação e o tokenizer devem seguir o formato que o modelo foi treinado para receber.”

### Aplicação prática

“Se a interface informa que nossa pergunta tem poucas palavras, isso ainda não determina o tamanho total da requisição. O histórico e a estrutura podem aumentar a quantidade de tokens.” Evite números de custo ou promessas sobre uma plataforma específica.

### Transição

“Agora temos as unidades da entrada. Como o computador identifica qual unidade é qual? É aqui que entram os IDs.”

## Slide 10: Cada peça tem uma etiqueta numérica

Duração sugerida: 3 min. Referência acumulada: 24–27 min.

### Fala sugerida

“Esta é a mesma peça de texto que vimos antes. Agora ela tem uma etiqueta: 8. O número é uma referência no catálogo, como a etiqueta de um item numa caixa. Ele não diz o que crédito significa, nem mede sua importância.” Revele a definição de Token ID e retome a tabela.

“Pensem num catálogo de uma biblioteca ou de produtos. O número do catálogo serve para localizar uma entrada. Com os tokens, fazemos algo parecido: cada entrada do vocabulário tem um identificador inteiro. Esse identificador se chama Token ID.

Na nossa tabela fictícia, Explique tem ID 42. Espaço seguido de crédito tem ID 8. As peças de rural têm IDs 73 e 19. O ponto tem ID 5. Esses números foram inventados para o desenho. Só têm sentido dentro desta tabela.”

Aponte para a linha de crédito. “Se eu receber o ID 8 usando este vocabulário, sei qual entrada estou referenciando. Em outro vocabulário, o 8 pode apontar para outra coisa. Portanto, não existe um número universal para a palavra crédito.”

### Detalhe técnico sem quebrar a intuição

“Nos desenhos, eu separei a escolha das peças da consulta dos IDs para mostrar os dois papéis. Em uma implementação real, a operação de codificação do tokenizer normalmente já entrega uma sequência de IDs. Não precisamos imaginar duas chamadas separadas na aplicação.”

### Verificação

“Qual entrada está associada ao 8 nesta tabela?” Espere a resposta. Depois pergunte: “Se eu mudar de tabela, posso levar esse significado do 8 junto automaticamente?” Esperado: não, depende do vocabulário. Faça a segunda pergunta de modo leve, sem transformar o momento numa prova.

### Transição

“Agora vem um cuidado essencial: o tamanho desse número não é uma medida de significado.”

## Slide 11: O número do ID serve para localizar

Duração sugerida: 2 min. Referência acumulada: 27–29 min.

### Fala sugerida

“Se um produto tem código 8 e outro tem código 9, eles podem ser completamente diferentes. O código permite localizar, mas sua magnitude não descreve o produto. Nos Token IDs, a ideia é a mesma.

O fato de dois números estarem próximos não indica que os tokens tenham significados parecidos. O fato de um ID ser maior também não indica maior importância, complexidade ou conhecimento. Não seria útil concluir que o token 73 é mais importante que o 8 só por essa comparação.”

Revele a frase. “Podemos reorganizar um catálogo e trocar os números de identificação, desde que também atualizemos de forma consistente tudo o que depende deles. Isso mostra que o papel do número é fazer referência a uma entrada. Na aplicação, usamos o catálogo esperado pelo modelo, sem fazer essa reorganização por conta própria.”

### Limite da analogia

Não afirme que o ID é o significado armazenado ou que o Transformer consegue aprender interpretando a grandeza do inteiro diretamente. A próxima etapa utiliza esse índice para buscar um vetor aprendido. Essa distinção evita a confusão entre um identificador discreto e uma representação que será usada em cálculos neurais.

### Transição

“Vamos guardar esses identificadores numa sequência, preservando a ordem da entrada.”

## Slide 12: A sequência preserva a ordem

Duração sugerida: 2 min. Referência acumulada: 29–31 min.

### Fala sugerida

“A nossa frase agora pode ser representada por esta sequência de IDs: 42, 8, 73, 19 e 5. A ordem é a ordem das unidades da entrada. Não ordenamos os IDs do menor para o maior, nem agrupamos iguais para formar um saco de números.

Isso importa porque trocar a ordem de unidades pode alterar o conteúdo da frase. Além de guardar a sequência, a arquitetura precisa incorporar informações de posição durante o processamento. Há diferentes maneiras de fazer isso. Neste encontro, não precisamos abrir essas implementações.

Se o mesmo token aparecer duas vezes, seu ID será o mesmo dentro deste vocabulário, mas ele ocupará posições diferentes. Essa distinção entre identidade e posição vai ser muito importante quando estudarmos como a representação muda com o contexto.”

### Gesto de apoio

Aponte da primeira para a última posição. Diga “qual item” ao apontar para o número e “onde aparece” ao apontar para a legenda de posição. É uma diferença pequena, mas ajuda a preparar o público para representações por posição no Transformer.

### Transição

“Nós temos referências para as peças. Agora precisamos das representações numéricas que a rede neural usa para trabalhar com elas.”

## Slide 13: Uma ficha com vários números

Duração sugerida: 3 min. Referência acumulada: 31–34 min.

### Fala sugerida

“Continuamos na mesma caixa de peças: a peça tem uma etiqueta, e usamos essa etiqueta para localizar sua ficha numérica. Ficha é só uma analogia para uma lista aprendida, sem campos como dinheiro ou agricultura. Um vetor pode ser entendido, neste momento, como uma lista de números com um tamanho definido. O desenho tem quatro números, então dizemos que ele tem quatro dimensões. Vetores reais de modelos podem ter muito mais dimensões. O tamanho depende da arquitetura.

A rede neural utiliza representações numéricas para fazer seus cálculos. Para cada entrada do vocabulário, existe um vetor aprendido. Quando esse vetor representa um token na entrada do modelo, chamamos de embedding de token.” Revele a frase com o termo técnico.

“Por que aprendemos esse conjunto de números? Porque, durante o treinamento, o modelo ajusta representações e outros parâmetros para melhorar sua tarefa de previsão. O vetor fornece um ponto de partida que participa desses cálculos. Ele pode carregar padrões úteis aprendidos a partir dos dados.”

### Evite uma falsa precisão

Não atribua nomes como “agricultura”, “dinheiro” ou “risco” às quatro dimensões. O público pode imaginar uma ficha com quatro campos definidos por uma pessoa. Em geral, as características aprendidas ficam distribuídas, e uma dimensão isolada não recebe um significado humano fixo.

### Verificação

“O ID 8 é uma referência para uma entrada. Este vetor tem vários números. Eles têm o mesmo papel?” Esperado: não. O ID identifica qual entrada buscar, e o vetor é a representação usada nos cálculos da rede.

### Transição

“Vamos ligar o ID à lista de números usando a tabela do modelo.”

## Slide 14: O ID seleciona uma linha da tabela

Duração sugerida: 4 min. Referência acumulada: 34–38 min.

### Fala sugerida

“Pensem no catálogo da nossa caixa de peças. A etiqueta diz onde procurar; a ficha numérica é o que encontramos. O modelo mantém uma tabela de vetores. Em matemática, uma tabela de linhas e colunas é uma matriz. Aqui chamamos de matriz de embeddings. Cada entrada do vocabulário tem uma linha com seu vetor.

Vamos acompanhar crédito. Na nossa tabela fictícia, seu ID é 8. Usamos o 8 para selecionar a linha correspondente. A saída é a lista com 0,20, menos 0,10, 0,70 e 0,30. Não fizemos uma conta em que o inteiro 8 foi transformado em significado. Fizemos uma consulta à representação aprendida. O nome dessa seleção é lookup.”

### Demonstração

Clique no botão da linha 42. Diga: “Agora mudei a entrada selecionada. O vetor da esquerda mudou porque estamos buscando outra linha da mesma tabela.” Clique na linha 73 e faça uma pausa curta. Por fim, volte ao 8, para manter a continuidade com a explicação.

“Se eu consultar novamente o mesmo ID nesta tabela, com os mesmos parâmetros do modelo, encontro o mesmo vetor inicial de token. O que vai depender da frase é o processamento das posições nas camadas seguintes, que veremos no próximo encontro.”

### Tamanho da tabela

“Num modelo real, há uma linha para cada entrada do vocabulário e um número fixo de dimensões nas colunas. Só estamos mostrando cinco linhas e quatro dimensões para conseguir ler. Os IDs não precisam aparecer em ordem no recorte do desenho.” Não apresente dimensões de um modelo específico sem fonte.

### Verificação

“O que o ID determina nesta operação?” Esperado: qual linha selecionar. “O que sai da operação?” Esperado: o vetor daquela entrada. Deixe quinze segundos para respostas e repita as duas funções apontando para tabela e vetor.

### Transição

“Essa tabela contém números aprendidos. Vamos explicar de onde vem o aprendizado, sem abrir a matemática do treinamento.”

## Slide 15: Os números são aprendidos no treinamento

Duração sugerida: 3 min. Referência acumulada: 38–41 min.

### Fala sugerida

“Vocês podem perguntar quem escreveu os números da tabela. Durante o treinamento, o modelo ajusta parâmetros para melhorar seu objetivo, como prever continuidades em sequências. Os vetores de entrada fazem parte desses parâmetros.

As representações podem capturar regularidades de como unidades aparecem e são utilizadas nos dados. Isso ajuda o modelo a trabalhar com padrões da linguagem. Entretanto, não existe uma pessoa preenchendo cada dimensão com um campo chamado agricultura, empréstimo ou certeza. As relações aprendidas ficam distribuídas nos números e nos outros parâmetros da rede.

Quando usamos um modelo já treinado para responder, estamos fazendo inferência. No caminho comum que estamos estudando, a requisição usa esses parâmetros existentes. A nossa frase não recria a matriz inteira e não provoca, automaticamente, uma atualização dos pesos do modelo.”

### Onde uma analogia pode enganar

Você pode falar em “ficha numérica inicial” para lembrar o vetor, mas diga que seus campos são aprendidos. Evite descrever a tabela como um cadastro explícito de fatos sobre crédito rural. Também não confunda a presença de uma informação no contexto de uma requisição com uma atualização dos parâmetros durante treinamento.

### Pausa

Pergunte: “Ao enviar a frase de hoje, estamos usando representações já aprendidas ou treinando um catálogo novo?” Esperado: usando representações já aprendidas. Se houver curiosidade sobre aprendizado com conversas, diga que isso depende de processos separados de coleta e treinamento. Não precisa abrir esse tema na apresentação.

### Transição

“Mesmo com números aprendidos, o vetor inicial ainda precisa se relacionar com os demais elementos da frase.”

## Slide 16: O vetor inicial é o ponto de partida

Duração sugerida: 2 min. Referência acumulada: 41–43 min.

### Fala sugerida

“A palavra banco aparece nestas duas situações. Se usamos o mesmo token e o mesmo ID, a consulta pura à tabela de embeddings começa com o mesmo vetor. Isso, sozinho, ainda não representa todas as relações daquele trecho específico.

Na primeira sequência, a pista sistema financeiro já apareceu antes. Na segunda, a pista praça já apareceu antes. As camadas do Transformer processam as representações e produzem novos estados para as posições, considerando o contexto que o modelo pode acessar.” Revele a frase sobre o Transformer.

“Estamos acompanhando um modelo causal. Para uma posição, o contexto disponível inclui a própria posição e as anteriores. Por isso coloquei as pistas antes de banco nos dois exemplos. Não quero sugerir que uma posição anterior leu uma palavra futura para decidir seu estado.”

### Precisão sem excesso

Explique que a representação que entra na rede também pode incorporar posição conforme a arquitetura. A frase “mesmo vetor” diz respeito ao lookup puro do mesmo ID com os mesmos parâmetros, não a toda representação já combinada com posição ou processada pelas camadas.

### Transição

“Hoje paramos nessa porta. Antes de fecharmos, vamos reconstruir o caminho que já conseguimos acompanhar.”

## Slide 17: Peça → etiqueta → ficha numérica

Duração sugerida: 1 min. Referência acumulada: 43–44 min.

### Fala sugerida e revelações

“Começamos com texto. O tokenizer organiza as unidades.” Avance para os tokens. “Cada peça tem uma etiqueta: seu ID no vocabulário.” Avance para os IDs. “Usamos a etiqueta para buscar a ficha numérica da peça: seu embedding inicial.” Avance para os vetores. “A rede processa essa sequência usando também informações de posição, conforme sua arquitetura.” Revele a frase final.

“Quero que guardem a diferença de papéis. Token é a unidade representada. ID é a referência dentro do vocabulário. Embedding é o vetor aprendido que usamos como ponto de partida. O Transformer vai transformar essas representações com as relações do contexto.”

### Ritmo

Este slide leva apenas um minuto: não repita a aula toda. Faça as quatro revelações com um pequeno intervalo entre elas. Se o público estiver acompanhando bem, peça que complete a frase “o ID serve para...” antes de revelar os vetores. Resposta esperada: selecionar ou localizar a representação da entrada.

### Transição

“Com esse caminho em mente, já conseguimos tomar alguns cuidados ao trabalhar com uma aplicação de IA.”

## Slide 18: Três cuidados que já podemos aplicar

Duração sugerida: 1 min. Referência acumulada: 44–45 min.

### Fala sugerida

“Primeiro, quando precisamos medir tokens, contamos usando a ferramenta compatível com o modelo e a entrada real. Segundo, lembramos que o texto da pergunta pode ser apenas parte do conteúdo enviado: instruções, mensagens anteriores e estrutura também podem entrar. Terceiro, separamos o número que identifica uma entrada do vetor que a rede neural vai processar.

O próximo encontro começa exatamente onde paramos: já temos a sequência de representações. Vamos acompanhar o que as camadas do Transformer fazem com ela e como as relações de contexto entram nos cálculos.

Por hoje, vocês já têm a primeira parte da história completa. Vamos usar os minutos finais para dúvidas sobre esse caminho.”

### Tempo

Este slide fecha o conteúdo aos 45 minutos. Se houver uma pergunta longa durante a explicação, agradeça e leve-a para o slide seguinte. Os anexos servem para apoiar respostas, sem ampliar a exposição principal.

## Slide 19: Perguntas

Duração sugerida: 5 min. Referência acumulada: 45–50 min.

### Condução dos cinco minutos finais

Abra espaço para dúvidas, sem cobrar que alguém responda como numa avaliação. Uma boa abertura é: “Qual transformação ficou mais abstrata: a divisão do texto, a identificação por números ou a seleção do vetor?” Use a resposta para retornar ao desenho correspondente pelo índice.

### Respostas curtas para dúvidas prováveis

**Um token é uma palavra?** Pode coincidir com uma palavra, mas também pode representar uma parte, pontuação ou outra unidade do vocabulário. A segmentação depende do tokenizer.

**O modelo aprende o significado a partir do número do ID?** O número identifica a entrada. Ele seleciona um vetor aprendido, e a rede processa esses vetores. A grandeza do ID não mede significado.

**Posso usar o mesmo tokenizer para qualquer modelo?** Use o tokenizer e a configuração compatíveis com o modelo. Vocabulários, IDs e formatos podem diferir.

**Embeddings são a busca vetorial?** Aqui acompanhamos vetores internos de tokens. Na busca, um modelo de embeddings representa textos ou trechos para comparação. O anexo 01 ajuda a separar os usos.

**Dimensões são características conhecidas?** Em geral, não há um rótulo humano fixo para cada dimensão. As regularidades aprendidas ficam distribuídas.

**O vetor inicial já usa a frase inteira?** O lookup puro do token não incorpora toda a frase. As camadas do modelo fazem a contextualização, seguindo o contexto acessível à posição.

**Uma entrada com menos tokens sempre custa menos ou responde melhor?** Custo e tempo dependem da plataforma e do processamento. Menos tokens não garantem qualidade. O objetivo de hoje é entender a unidade de representação. Detalhes de latência ficam para o quarto encontro.

### Fechamento

Aos 49 minutos, responda a última dúvida e diga: “No próximo encontro, vamos entrar no Transformer usando este mesmo ponto de partida.” Não percorra os anexos automaticamente. O índice abre os extras somente quando ajudam a responder algo concreto.

## Slide 20: Vetores podem representar unidades diferentes

Anexo opcional, fora do roteiro principal.

### Quando usar

Abra este anexo se alguém associar automaticamente o embedding da aula à busca semântica ou ao RAG. Não o inclua na sequência principal sem ajustar o tempo.

### Fala sugerida

“Hoje seguimos a representação de cada token na entrada do LLM. Em busca semântica, normalmente temos um modelo que representa um trecho ou texto em um vetor, e comparamos esses vetores para recuperar itens relevantes.

Ambos usam representações numéricas aprendidas, mas o vetor do trecho não é simplesmente o Token ID daquele trecho, nem necessariamente uma linha da tabela de embeddings de entrada. O modelo que produz a representação do texto processa o conteúdo de uma maneira apropriada à tarefa. A unidade que representamos e o objetivo da comparação são diferentes.

Também não podemos supor que vetores de modelos diferentes pertençam ao mesmo espaço de comparação. Ao montar uma busca, precisamos seguir o modelo de embeddings e sua configuração.”

### Retorno

Use o índice ou End para voltar a Perguntas. Esse detalhe prepara futuras conversas sobre RAG, sem mudar o objetivo do encontro de hoje.

## Slide 21: O mesmo caminho, quatro papéis

Anexo opcional, fora do roteiro principal.

### Quando usar

Use como apoio se uma pergunta misturar os nomes ou se houver necessidade de recapitular em poucas frases. Não reinicie toda a exposição.

### Fala sugerida

“Vamos seguir a pergunta original. Primeiro, temos o texto preparado. Depois, o tokenizer o representa com suas unidades. Para referenciar cada unidade, usamos o ID dentro do vocabulário. O modelo usa esse índice para selecionar o vetor de entrada.

Cada termo responde a uma pergunta diferente. O que enviamos? Texto. Quais são as unidades? Tokens. Como referenciamos a unidade no catálogo? ID. Qual representação numérica a rede começa a processar? Embedding.

Nas camadas seguintes, o modelo produz hidden states, que são novas representações por posição. Não são apenas o vetor original que saiu da tabela. Essa diferença será o ponto de partida do segundo encontro.”

### Retorno

Volte ao slide de perguntas. Se a dúvida foi sobre IDs, a tabela do slide 10 também permite responder com um exemplo concreto.

## Slide 22: Para continuar aprendendo

Anexo opcional, fora do roteiro principal.

### Quando usar

Abra se perguntarem onde revisar os conceitos ou onde confirmar uma definição. Os links funcionam com internet, mas a apresentação inteira abre sem rede. Não clique em páginas externas durante a reunião se isso atrapalhar o tempo.

### Fala sugerida

“Estas são referências técnicas públicas para conferir os conceitos. A documentação de tokenização explica as famílias de algoritmos e o processo de codificação. A camada de embedding documentada no PyTorch mostra a consulta de índices a vetores aprendidos. Os formatos de chat ajudam a entender como mensagens e tokens de controle entram na entrada.

As tabelas e divisões da nossa apresentação foram inventadas para ensino e não pretendem reproduzir uma implementação de um fornecedor. Se quiserem conferir uma entrada real, precisamos escolher o modelo e executar seu tokenizer com a configuração correta.”

### Retorno

End volta a Perguntas. Encerre o encontro com o ponto de partida do próximo episódio, sem introduzir novas siglas neste momento.
