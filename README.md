<h1 align="center">
  <br />
  <a href="hhttp://www4.infraero.gov.br/"><img src="https://github.com/mtwzim/infraero/blob/main/content/infraero.png" alt="Infraero" width="200"></a>
  <br />
  Infraero
  <br />
</h1>

<h4 align="center">Um simples meio de obter informações da <a href="http://www.infraero.gov.br" target="_blank">Infraero</a>.</h4>

### Instalação

#### npm

```
$ npm install --save infraero
```

#### yarn

```
$ yarn add infraero
```

### Como utilizar

Note que **SBRF** é o código ICAN do aeroporto, ainda estamos desenvolvendo uma funcionalidade para listar todos os ican's da Infraero

#### Listar partidas de um aeroporto

```
const { getVoosPartida, getVoosChegada } = require('infraero');

async function infraeroPromiseExample() {
  getVoosPartida('SBRF').then(console.log).catch(console.error);
}

infraeroPromiseExample();
```
