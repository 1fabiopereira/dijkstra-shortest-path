# dijkstra-shortest-path
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## 🔶 Instalação
Para fazer a instalação do projeto é necessário clonar o repositório, para isso execute: 

```
git clone https://github.com/1fabiopereira/dijkstra-shortest-path.git
```

Após a execução do comando acima, entre no diretório do projeto e instale as dependências necessárias:

```
cd dijkstra-shortest-path && yarn install
```
- __note:__ Caso esteja utilizando o `npm` basta utilizar o comando equivalente para a instalação das dependências.

## 🔶 Executar como CLI
Para iniciar a aplicação em modo CLI execute:

```
node cli.js ~/caminho/do/arquivo/csv/routes.csv
```

Caso tudo ocorra bem você terá uma saída similar a exemplificada abaixo:

```
node cli.js ~/Desktop/rotas.csv
📌 - Note: To cancel press CTRL + C
? Please enter the route: ›
```

Agora com a aplicação executando basta entrar com as consultas de rotas da seguinte maneira:

```
✔ Please enter the route: … GRU-CDG
✅ : GRU - BRC - SCL - ORL - CDG > $40
? Please enter the route: ›
```

caso a rota buscada não exista no arquivo ou não for encontrada será exibida a seguinte mensagem:

```
✔ Please enter the route: … GRU - EVZ
❌ - Route not found. Check if you typed correctly!
```
- __note:__ Os espaços entre o ponto de origem e destino não influenciam na busca, no entanto maiúsculas e minúsculas tem influencia já que a aplicação é `case sensitive`;

Para finalizar a execução da aplicação basta precionar `CTRL + C`, com isso verá a seguinte saída:

```
👋 - Hasta la vista baby!
```

## 🔶 Executar como web API
Para a inicialização da aplicação em modo API, execute:

```
node web.js ~/caminho/do/arquivo/csv/routes.csv
```

Assim que a inicialização da aplicação for concluída verá a seguinte saída no terminal:

```
😎 - Application started at port 3000
```

Para consumir a API em execução é necessário a utilização de algum cliente HTTP, pode ser uma aplicação com interface gráfica como `Postman`, `Insomnia` ou uma ferramenta de linha de comando como o `Curl`

Para obter a melhor rota e seu custo basta fazer uma requisição `GET` para a rota `/`:

```
curl http://localhost:3000\?route\=GRU-SCL
```

Se tudo ocorrer bem receberá uma saída em formato JSON com dois campos, sendo um a melhor rota e o outro o custo da rota em questão. Assim como no exemplo abaixo:

```
{"route":"GRU - BRC - SCL","cost":15}
```

Para adicionar novas rotas no arquivo que foi carregado na inicialização da aplicação pode-se fazer uma requisição `POST` para `/add`:

```
curl -H "Content-Type: application/json" -X POST -d '{"start":"NAT","end":"GRU", "cost": 76}' http://localhost:3000/add
```

Observe que os dados devem ser enviados em formato JSON e devem conter todos os campos apresentados acima, sendo:

- `start` (String) - Origem da rota

- `end` (String) - Destino da rota

- `cost` (Number) - Custo da rota

Para finalizar a execução da aplicação execute `CTRL + C` assim como feito na aplicação CLI.

## 🔶 Estrutura / Solução
```
.
├── README.md
├── __tests__
├── cli
├── cli.js
├── common
├── node_modules
├── package.json
├── web
├── web.js
└── yarn.lock
```

O projeto é dividido em 3 núcleos, sendo eles `common`, `cli` e `web`.

- `commom`: Como o próprio nome sugere é uma pasta onde encontra-se arquivos comuns as demais partes da aplicação, é nesta pasta que encontram-se os módulos de leitura e escrita de arquivos CSVs e a implementação simplificada do algoritmo de [Dijkstra](https://pt.wikipedia.org/wiki/Algoritmo_de_Dijkstra#:~:text=O%20algoritmo%20de%20Dijkstra%2C%20concebido,e%20n%20%C3%A9%20o%20n%C3%BAmero%20de), utilizado para calcular a melhor rota entre os pontos.

- `cli`: Pasta que contem arquivos referentes a interface de execução em linha de comando.

- `web`: Contem uma API web simples que responde requições em formato JSON, permitindo que aplicações externas consigam consumir os calculos de rotas.

## 🔶 Tests

Para a execução dos testes é necessário estar dentro do repositório e ter instalado as dependências do projeto, feito isso, execute:

```
yarn run tests
```

O resultado deve ser semelhante à:

```
$ mocha -r esm __tests__/**/*.spec.js


  📌 LoadCSV
    ✓ Successfully loaded file
    ✓ File not exist or path is wrong
    ✓ Path have wrong extension

  📌 SaveCSV
    ✓ Successfully save file
    ✓ The data provided is empty
    ✓ The data provided have wrong format
    ✓ Path have wrong extension

  📌 Dijkstra
    Constructor
      ✓ Creates an instance of Graph
      ✓ Accepts a Map as graph
      ✓ Accepts numbers as key when in a map
    Add
      ✓ Add a node
      ✓ Returns the Graph object
    Path
      ✓ Returns the shortest path
      ✓ Returns cost of shortest path
      ✓ Returns null when no path is found
      ✓ returns null when no vertices are defined

  📌 ObjectToMap
    ✓ Transforms a one level object
    ✓ Transforms a two level object
    ✓ Transforms a three level object
    ✓ Transforms a four level object
    ✓ Rejects non-number values
    ✓ Rejects negative values
    ✓ Rejects zero
    ✓ Accepts float numbers
    ✓ Accepts a string that represent a number

  📌  Queue
    Constructor
      ✓ Starts an empty queue
    Sort
      ✓ Sorts by having the smallest first
    Set
      ✓ Only accept numbers
      ✓ Adds an nonexistent key
      ✓ Updates the value of an existing key
    Next
      ✓ Removes the first element
      ✓ Return the first element
    IsEmpty
      ✓ Returns false when there are elements
      ✓ Returns true when the queue is empty
    Has
      ✓ Returns false when the key does not exist
      ✓ Returns false when the key does not exist
    Get
      ✓ gets the entry with the provided key


  37 passing (57ms)
  ```

