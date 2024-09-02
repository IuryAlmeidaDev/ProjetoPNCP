# Projeto de Consulta e Gerenciamento de Contratos

## Descrição

Este projeto é uma aplicação web que consulta contratos de um órgão público usando a API do Portal Nacional de Contratações Públicas (PNCP) e envia esses contratos para um back-end, onde são armazenados em um banco de dados MySQL. A aplicação também calcula o valor total dos contratos e exibe informações relevantes sobre o órgão público.

## Funcionalidades

- **Consulta de Contratos**: Realiza uma consulta na API do PNCP com base em CNPJ, datas e número da página.
- **Exibição de Dados**: Mostra informações sobre o órgão público e uma lista detalhada dos contratos.
- **Envio de Dados para o Back-End**: Envia os contratos recebidos para um servidor back-end.
- **Cálculo do Valor Total**: Calcula e exibe o valor total dos contratos encontrados.

## Tecnologias Utilizadas

- **Front-End**: React, Axios
- **Back-End**: Node.js, Express
- **Banco de Dados**: MySQL
- **API**: PNCP API

## Estrutura do Projeto

### Front-End

O front-end da aplicação é desenvolvido em React e realiza as seguintes funções:

- **Formulário de Pesquisa**: Permite ao usuário inserir CNPJ, datas e número da página para buscar contratos.
- **Listagem de Contratos**: Exibe contratos encontrados com informações detalhadas.
- **Informações do Órgão**: Mostra detalhes do órgão público e o valor total dos contratos.

**Arquivos principais:**
- `App.js`: Componente principal da aplicação React.
- `App.css`: Arquivo de estilos CSS.

### Back-End

O back-end é implementado usando Node.js e Express e realiza as seguintes funções:

- **Conexão com MySQL**: Configura e conecta ao banco de dados MySQL.
- **Rota de API**: Recebe contratos do front-end e os armazena no banco de dados.

**Arquivos principais:**
- `server.js`: Arquivo principal do servidor Node.js.
- `package.json`: Gerenciador de pacotes e dependências.

### API de Consultas

A API do PNCP é usada para buscar contratos. O token de autenticação é necessário para realizar as requisições.

**Endpoint:**
- `GET https://pncp.gov.br/api/consulta/v1/contratos`

### Instruções de Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/IuryAlmeidaDev/ProjetoPNCP

## Configuração do Projeto

### Configuração do Back-End

1. **Navegue para o diretório do back-end:**

   `cd backend`

2. **Instale as dependências:**

   `npm install`

3. **Configure o banco de dados MySQL:**

   - Crie um banco de dados com o nome `PNCP`.
   - Atualize as credenciais do banco de dados no arquivo de configuração do back-end.

4. **Inicie o servidor:**

   `npm start`

   O servidor estará rodando na porta `5000`.

### Configuração do Front-End

1. **Navegue para o diretório do front-end:**

   `cd frontend`

2. **Instale as dependências:**

   `npm install`

3. **Inicie o servidor de desenvolvimento:**

   `npm start`

   O front-end estará disponível em `http://localhost:3000`.

### Acessar a Aplicação

Abra um navegador e acesse `http://localhost:3000` para visualizar a aplicação.


MIT License

Copyright (c) 2024 Iury Almeida


