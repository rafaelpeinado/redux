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




