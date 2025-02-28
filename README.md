# Teste Técnico Fullstack

Bem-vindo ao teste técnico para avaliar suas habilidades de desenvolvimento Fullstack! Este desafio combina elementos de Frontend e Backend para testar sua capacidade de criar uma aplicação completa. O objetivo é desenvolver uma aplicação CRUD com um backend robusto e um frontend intuitivo.

## Objetivo

Desenvolver uma aplicação CRUD completa (Create, Read, Update, Delete) com um backend robusto e um frontend intuitivo. A aplicação deve permitir a criação, leitura, atualização e exclusão de itens, sendo que cada item possui os campos de título, descrição e foto.

## Estrutura do Projeto

O repositório está estruturado em duas partes: o **backend** e o **frontend**.

- **/backend**: Código fonte do backend, desenvolvido com **NestJS** e utilizando **MongoDB** com **Mongoose**.
- **/frontend**: Código fonte do frontend, desenvolvido com **Angular**.

## Requisitos

### Backend

- **Tecnologia**: Utilize **NestJS** (preferido) ou **Express**.
- **Armazenamento de Dados**: Persista os dados utilizando **MongoDB** com **Mongoose** para definição dos schemas.
- **Funcionalidades**:
  - Implemente operações **CRUD** para itens (com os campos: título, descrição, URL da foto).
  - Garanta validação dos campos obrigatórios.
  - Utilize **MongoDB em memória** para desenvolvimento e testes.
  - Forneça respostas significativas da API com códigos **HTTP apropriados**.
- **Melhorias Opcionais**:
  - Recorte de imagens durante o upload utilizando uma biblioteca como **sharp**, garantindo proporção 1:1.
  - Implementação de **paginação**, **filtros** e **ordenação** nos endpoints de listagem.

### Frontend

- **Tecnologia**: Utilize **Angular**.
- **Funcionalidades**:
  - Implemente uma interface para **criar**, **ler**, **atualizar** e **excluir** itens.
  - Integre com a API backend desenvolvida.
  - Inclua feedback para o usuário nas ações realizadas (ex.: notificações de sucesso/erro).
- **Manipulação de Fotos**:
  - Exiba corretamente as fotos enviadas.
  - **Opcional**: Implementação de funcionalidade de recorte de imagem ao enviá-la.
- **Design**:
  - Crie uma interface **responsiva** e visualmente atraente.
  - **Opcional**: Implemente **paginação**, **filtros** e **ordenação** na visão de listagem.

### Considerações

- **Integração**:
  - Garanta uma comunicação fluida entre o backend e o frontend.
  - Resolva possíveis problemas de **CORS** de maneira eficaz.
  
- **Testes**:
  - **Backend**: Inclua testes unitários para as principais lógicas de negócio.
  - **Frontend**: Utilize o framework de testes do **Angular** para componentes e serviços principais.

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes)
- **MongoDB** (ou use MongoDB em memória para desenvolvimento)

### Configuração e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/meu-repositorio.git
   cd meu-repositorio
2. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
3. Instale as dependências do frontend:
   ```bash
   cd frontend
   npm install
4. Para iniciar o backend:
   ```bash
   cd backend
   npm run start:dev
5. Para iniciar o frontend:
   ```bash
   cd frontend
   npm run start
6. Acesse a aplicação no seu navegador:
- Frontend: http://localhost:4200
- Backend: API está disponível em http://localhost:3000

## Estrutura de Banco de Dados

A aplicação usa **MongoDB** com os seguintes campos para os itens:

- **Título**: String (obrigatório)
- **Descrição**: String (obrigatório)
- **URL da Foto**: String (obrigatório)

## Arquitetura do Projeto

### Backend

- **NestJS** foi escolhido para a construção do backend devido à sua arquitetura modular e flexível, que facilita a criação de APIs escaláveis.
- **Mongoose** é usado para a persistência dos dados no MongoDB e para a definição dos schemas.

### Frontend

- **Angular** foi escolhido por ser uma framework robusta e estruturada, ideal para a construção de aplicações de grande escala.
- A comunicação entre frontend e backend é realizada via requisições HTTP, utilizando **HttpClient** do Angular.


- **Angular** foi escolhido por ser uma framework robusta e estruturada, ideal para a construção de aplicações de grande escala.
- A comunicação entre frontend e backend é realizada via requisições HTTP, utilizando **HttpClient** do Angular.
