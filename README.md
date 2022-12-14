# Redux Fundalmentals
Esse o [link para o Redux Fundalmentals no Pluralsight](https://www.pluralsight.com/courses/redux-fundamentals "Redux Fundalmentals")
O Redux é uma ferramenta que ajuda a simplificar o gerenciamento de estado em seu aplicativo da web em Javascript. 

## Introdução
### State
Todos os valores de uma interface fazem parte de um estado. 
Uma boa maneira de representar estado é como um objeto JavaSCript, conhecido como modelo.

#### MVC
O MVC tradicional pode trazer diversos bugs, pois várias partes da aplicação podem fazer alterações de estado e gerar loops infinitos de renderização. É muito difícil controlar estado com esse modelo.

#### Flux
O **Facebook** estava enfretando problemas com controle de estado com MVC tradicional e lançaram o Flux.
O **Redux** é a melhor maneira de fazer o Flux.

#### Redux Data flow
Ao invés de pensar em models, o Redux lida com **Store**, que basicamente é um grande objeto JavaScript que contém todo o estado.
O estado pode ser dividido em vários objetos que renderizam os dados na UI.
Qualquer evento de mudança é chamado de **Ação**. Essas mudanças podem fazer chamadads em APIs. Para isso, pode ser criada outra Ação, que faz uma chamada de API. E depois diparar outra ação que poderá chamar outra ação de dados recebidos.
Sendo assim, o Store é atualizado usando um **Reducer**, o qual é uma função que decide como lidar com a ação atual.
O Redux utiliza um **Fluxo de Dados Unidirecional**. Desta forma, é muito mais simples encontrar bugs.

## Conceitos importantes
### Funções Puras
Funções impuras dependem de uma variável global. Enquanto a **Função Pura** depende apenas dos parâmetros inseridos.
**Possuem três características primárias:** 
* Não acessa nenhuma variável que esteja fora do escopo da função;
* Não tem efeitos colaterais, ou seja, não mutam ou alteram quaisquer variáveis que não estejam dentro da função e nem si mesmas;
* Dada a mesma entrada, sempre terá a mesma saída.
A função pura garante que o código seja mais previsível e mais confiável, o que é importante para evitar bugs.
**Benefícios:**
* Confiabilidade
* Simplicidade

### Imutabilidade
Quando um estado é mutável, perdemos todo o histórico e rastreamento. Com isso, não é possível descobrir o que impactou ou gerou a mudança, já que a mudança atual sobrescreveu a mudança anterior.
Com a imutabilidade podemos clonar o estado antes de modificá-lo. Em JavaScript, comoeçando com o **ES6**, podemos usar o **Object**. **Object.assign** pode ser usado para clonar ou mesclar objetos.
Sendo assim, Object.assign({}, state, { points: 50 }) cria um objeto novo, copia o state com todas sas propriedades do objeto e mesclar em um atributo de pontos que agora será 50, respectivamente.
**A imutabilidade permite:**
* Ter instantes do State
* Desfazer se o aplicativo estiver com erro, voltando para o estado anterior
* Recriar o estado a partir do URL
* Viagem no tempo

**Resumindo:**
* Não apenas muta o objeto, mas se mudá-lo, faça uma cópia primeiro, e então faz as modificações nessas cópia e segure a original
* Importante para o Redux
* Ajuda a acompanhar as mudanças e manter o desempenho.


## React Crash Course
### ES6 Class Syntax
React usa sintaxe do ES6 para classes
**Antes do ES6**

* Define um construtor
function Car(color) {
    this.color = color;
}

* Anexa o método prototype de getColor
Car.prototype.getColor = function() {
    return this.color;
}

* Isso permite instanciar um novo objeto do tipo Car
var myCar = new Car('red');

**Com ES6**
class Car2 {
    constructor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
}

var myCar2 = new Car2('blue');

Isso garante que heranças sejam mais simples de serem gerenciadas.

**React Component**
class Simples extends React.Component {
    render() {
        return <'h1'>Hello, World<'/h1'>; (isso se chama JSX)
    }
}

### React Hello World
O JSX é compilado para um JavaScript válido
* Instala o babel-cli
* Depois instalar babel-plugin-transform-react-jsx
* Execute node_modules/.bin/babel --plugins transform-react-jsx js/example1.js
* Para salvar automaticamente node_modules/.bin/babel --plugins transform-react-jsx -o js/example1.min.js js/example1.js
* Para recompilar qualquer mudança pode-se usar o parâmetro -w, --watch, ou seja, node_modules/.bin/babel --plugins transform-react-jsx -w -o js/example2.min.js js/example2.js

### React e Webpack
Webpack é um módulo que combina os arquivos. Então, ao invés de ter seis ou mais tags de script, existe um pacote.

## The Problem with State
### State Problems
"start": "concurrently \"npm run server\" \"npm run webpack\" " = executará simultaneamente o comando server, ou seja, o aplicativo node ./server/app.js e o comando webpack, webpack -w.

ao invés de usar:
- var conversionRate = this.props.conversionRate
- var fee = this.props.fee

melhor usar:
var { conversionRate, fee } = this.props

Isso é chamado de desestruturação do ES6


.bind retorna uma nova função a cada vez que é chamado

### Should You Use Redux?
#### Without Redux
* Comunicação de vários states
* Erros de states e cenários complexos
* Muitas chamadas Ajax
* Muito confuso

#### With Redux
* Fluxos de dados mais claros
* State é previsível

#### With React (no Redux)
* Ainda falta de insight e falta de clareza ou transparência
* Fluxo de dados não escala bem
* Ainda muito confuso

#### Evaluating New Technology
O ideal seria
* **Qual o problema:** Tenho um problema de states
* **Possível solução:** Talvez Redux pode resolver meu problema
* **Pequena Experiência:** Criar um projeto em paralelo utilizando Redux
* **Grande Experiência:** Introduzir a solução no projeto principal ao poucos 
* **Evolução:** Está funcionando?
* **Decisão:** Usar mais Redux ou repetir processo

**Obs.:** O criador do Redux, Dan Abramov, escreveu um artigo **You Might Not Need Redux**, onde ele expõe razões a favor e contra o uso do Redux.


## Redux Basics
### Redux Building Blocks

* Instala o Redux com --save-dev, porque não é necessário carregar o biblioteca do redux em produção.
* com o STORE queremos ou atualizar ou definir o STATE
Obs.: verificar a documentação do Babel, pois lá tem um comitê chamado TC39 que trata das atualizações do JS.

### React-redux

O método de **connect** tem várias melhoras de desempenho




## Asynchronous Actions
### Middleware
* instalar npm i --save-dev redux-logger
* isso imprime no console o state anterior, a action com o type e o data, e oo próximo state que é a nova atualização
* o states só podem ser alterados por uma ação
* [Documentação do Redux Logger](https://npm.io/package/redux-logger "Redux Logger") 


### Async Actions
Quando chamamos o dispatch, ele chama uma função reducer que foi definida pelo método createStore. Passamos dois parâmetros no dispatch:
* O primeiro é o state atual, antes que a action seja aplicada
* O segundo é a ação, ou seja, o objeto que estamos passando para o dispatch

**redux-thunk** é um middleware que nos permite actions assíncronas. 
Como o redux-thunk foi inserido, podemos passar uma função para dispatch. Quando o dispatch é chamado com uma função, ele é executado e em seguida o Redux destrói e ignora a função. Essa função por si só não chama o reducer e isso não afeta o estado do Redux.
Podemos usar essa função para fazer um trabalho assíncrono e, em seguida, chamar o dispatch com o resultado.
Há dois momentos importantes quando faz um chamada **AJAX**: quando faz a solicitaçã oe quando recebe a resposta


### Actions Creators
É necessário fazer **debounce**, pois quando são retornados 3 chamadas asíncronas do Ajax há dois problemas:
* primeiro que estamos fazendo chamadas desnecessárias e deserperdiçando recurso
* segundo que a ordem das chamadas asíncronas podem chegar diferentes do resultado que esperávamos, por exemplo, posso estar esperando a última chamada, mas a primeira chamada chegar por último e ser apresentado na interface.

O **Reducer** dever ser puro, ou seja, não pdoe haver chamadas com efeitos colaterais. Nenhuma chamada Ajax, nenhuma variável que não seja explicitamente passada.


## The State Tree
### Serial Ajax Calls
Esperávamos que o **originAmount** mudasse após a **action RECEIVED_CONVERSION_RATE_SUCCESS** ser acionada. Então é necessário inspecioná-la. No vídeo, podemos ver que o novo **originAmount** é de **US$ 212.77**, mas mesmo assim não está refletindo na interface de usuário.
No **next state** , o **originAmount** está 300. Então, apesar de que o payload tenha voltado 212.77, o state do Redux permanece em 300.

### Multiple Reducers
Temos permissão para ouvir a mesma **action** em vários **reducers**, pois uma vez que o **dispatch** chama todos os **reducers**, podemos ter vários **reducers** escutando a mesma **action**.

A sugestão de divisão dos **reducers** é tentar organizá-los por domínio e não apenas aos recursos de interface do usuários, pois eles podem mudar com frequência e pode ser muito trabalhoso ter que alterar a estrutura do **reducer** com frequência.

No caso do curso, sempre teremos erros na interface do usuário, por isso é seguro ter um **reducer** de erros. E também sempre teremos um recurso de quantia onde pode alterr quantia ou um recurso de transação. Ou seja, são domínios bastante seguros, pois isso não vai mudar. 

Sendo assim, mesmo se a interface do usuário mudar, certas propriedades podem mudar, mas o domínio não.



## Redux Internals
### Writing combineReducers()
A função combineReducers retorna uma função que chamará o reducer de apple e atribui o resultado disso à propriedade apple.
Em seguida, chama o reducer de orange e, em seguida, atribui o resultado disso à propriedade orange.
Ou seja, o combineReducers retorna uma função que percorre cada uma das propriedades, chama o reducer associado e, em seguida, salva o state resultante dessa chamada na propriedade à qual está atribuída.


## Redux Across Frameworks
### Vue.js with Redux
Para o Redux, nós temos que pensar principalmente em duas coisas, como obter os dados do Redux e como configurá-los.

Temos três passos: 
* Estado inicial, ou seja, quando o componente é carregado
* Fazer atualizações no armazenamento com base nas ações desse componente com base nas ações da interface do usuário do componente.
* Precisamos refletir essas alterações de estado de volta à interface do usuário

**Redux e Vue** têm diferenças fundamentais em como eles lidam com atualizações de estado. No Redux, toda vez que o estado é atualizado, eliminamos todo o estado e retornamos uma cópia nova em folha de todo o estado. No Vue, o objeto de estado pai permanece o mesmo, e o Vue escuta para ver se alguma das propriedades filho desse objeto é alterada. É assim que Vue ouve as atualizações de estado. Se você eliminar o objeto pai, então você está eliminando todos esses ouvintes. Portanto, precisamos atualizar esse código para que o objeto pai que passamos para a propriedade de dados "data: reduxState" no arquivo main.js não seja alterado.

**Vuex** é um padrão e biblioteca de gerenciamento de estado. Inspirado por Flux, Redux e Elm. Ou seja, a melhor sugestão para usar no Vue é o Vuex.

### Angular.js with Redux
Usar Lifecycle Hooks, ngOnInit() para atualização com subscribe e ngOnDestroy() para limpá-lo quando terminar.

Como no Vue, o Angular tem bibliotecas próprias.
* uma opção é o Angular 2+ bindings for Redux, que é uma versão Angular do React Redux
* a outra é o NgRx e temos: 
* * @ngrx/store - que é o gerenciamento de estado com alimentação RxJS para aplicativos Angular inspirados no Redux






