<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="assets/img/ logo.png" width="200px" />
</h1>

<h3 align="center">
  GymPoint - RocketSeat
</h3>

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361" />
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361" />
</p>

<p align="center">
  <a href="#bookmark-sobre-o-projeto">Sobre o projeto</a>&nbsp;|&nbsp;
  <a href="#rocket-tecnologias-utilizadas">Técnologias</a>&nbsp;|&nbsp;
  <a href="#art-ayout">Layout</a>&nbsp;|&nbsp;
  <a href="#zap-running">Running</a>&nbsp;|&nbsp;
</p>

## :bookmark: Sobre o projeto

O projeto GymPoint se baseia em um sistema de gestão de academia com os seguintes módulos:

> O Sistema WEB é voltado para a parte admnistrativa da academia, onde poderá cadastrar os alunos, fazer a manutenção dos planos e matriculas e responder todas as questões enviadas pelos alunos via app.

- Alunos
- Planos
- Matrículas
- Responder pedidos de auxílio

> APP mobile é voltado interamente aos alunos, que deverão utilizar para fazer os check-ins ao chegarem na academia, manter seus dados atualizados e também poder enviar dúvidas através dos pedidos de auxílios

- Check-ins
- Criar pedidos de aúxilio
- Conta do aluno

## :rocket: Tecnologias utilizadas

- BackEnd

  - [x] NodeJS
  - [x] Sucrase
  - [x] Nodemon
  - [x] Express
  - [x] Sequelize
  - [x] Yup
  - [x] jsonwebtoken
  - [x] date-fns
  - [x] cors

- FrontEnd

  - [x] ReactJS
  - [x] Redux
  - [x] Redux-saga
  - [x] Redux-persist
  - [x] Reactotron
  - [x] Redux
  - [x] Styled-components
  - [x] PropTypes
  - [x] immer
  - [x] date-fns
  - [x] React-Toastify

- Mobile
  - [x] React-native
  - [x] Styled-components
  - [x] Async-storage
  - [x] React-native-vector-icons
  - [x] date-fns

## :art: Layout

O layout do projeto está em anexo como um arquivo `.sketch` dentro do diretório **./assets**

Caso esteja usando OS X / Windows você pode abrir esse arquivo com um software chamado [Zeplin](https://zeplin.io).

Uma outra forma de visualizar o layout do projeto via brownser, é através do [Figma](https://www.figma.com/)

## :zap: Running

- Pré-requisitos

  - [x] Yarn v1
  - [x] NodeJS v12
  - [x] PostgreSQL
  - [x] React Native CLI :iphone:
  - [x] JDK (Java Development Kit) :iphone:
  - [x] Emulador mobile ou dispostivo físico :iphone:

- Backend

  - Após clonar o projeto, acessar a pasta **backend** e executar os seguintes comandos:
    - yarn ( Instalará todas dependências do projeto )
    - yarn sequelize db:migrate ( Criará toda a estrutura do banco de dados)
    - yarn sequelize db:seed:all ( Gerará os inserts default em suas respectivas tabelas )
    - yarn start ( Iniciará a API )

- Web

  - Após clonar o projeto e iniciar a api conforme o passo anterior é bem fácil
    - yarn ( Instalará todas dependências do projeto )
    - yarn start ( Iniciará o projeto )

- Mobile
  - Após clonar o projeto e iniciar a api conforme o passo anterior, vamos lá:
    - yarn ( Instalará todas dependências do projeto )
    - yarn react-native run-android ( Instalará a APK em seu dispositivo )
    - yarn start ( Iniciará o projeto via METRO BUNDLER )

<h6 align="center">
Feito com :purple_heart:
</h6>
