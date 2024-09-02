// Importa os módulos necessários
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializa a aplicação Express
const app = express();
const port = 5000; // Porta em que o servidor vai escutar

// Configuração básica do CORS para permitir requisições de outros domínios
app.use(cors());

// Configuração do bodyParser para lidar com requisições JSON
app.use(bodyParser.json());

// Conecta ao banco de dados MySQL com as credenciais fornecidas
const db = mysql.createConnection({
  host: 'localhost', // Endereço do servidor MySQL
  user: 'root', // Usuário do MySQL
  password: '350022', // Senha do MySQL
  database: 'PNCP' // Nome do banco de dados
});

// Estabelece a conexão com o banco de dados e verifica se há erros
db.connect((err) => {
  if (err) {
    throw err; // Lança um erro se a conexão falhar
  }
  console.log('Conectado ao banco de dados MySQL'); // Confirmação de sucesso
});

// Rota para receber contratos via POST
app.post('/api/contratos', (req, res) => {
    const contratos = req.body.contratos; // Obtém a lista de contratos do corpo da requisição
  
    console.log('Contratos recebidos:', contratos); // Log para verificar os dados recebidos
  
    // Itera sobre cada contrato para inseri-los no banco de dados
    contratos.forEach((contrato) => {
      // SQL para inserção de dados na tabela Contratos
      const sql = 'INSERT INTO Contratos SET ?';
      // Valores a serem inseridos no banco de dados
      const values = {
        cnpj: contrato.orgaoEntidade.cnpj,
        dataInicial: contrato.dataInicial, // Verifique se o campo está correto
        dataFinal: contrato.dataFinal,
        pagina: contrato.pagina,
        orgaoEntidadeCnpj: contrato.orgaoEntidade.cnpj,
        orgaoEntidadeRazaoSocial: contrato.orgaoEntidade.razaoSocial,
        dataVigenciaInicio: contrato.dataVigenciaInicio,
        dataVigenciaFim: contrato.dataVigenciaFim,
        nomeRazaoSocialFornecedor: contrato.nomeRazaoSocialFornecedor,
        objetoContrato: contrato.objetoContrato,
        valorInicial: contrato.valorInicial
      };
  
      // Executa a consulta de inserção e trata erros, se houver
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Erro ao inserir contrato:', err); // Log de erro se a inserção falhar
          return;
        }
        console.log('Contrato inserido com sucesso:', result.insertId); // Confirmação de sucesso com o ID do contrato inserido
      });
    });
  
    // Responde ao cliente indicando que os contratos foram recebidos com sucesso
    res.status(200).json({ message: 'Contratos recebidos com sucesso' });
});

// Inicia o servidor na porta especificada e confirma que está rodando
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
