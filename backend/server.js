const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
// Configuração básica do CORS
app.use(cors());

app.use(bodyParser.json());

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Seu usuário do MySQL
  password: '350022', // Sua senha do MySQL
  database: 'PNCP' // Nome do seu banco de dados
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.post('/api/contratos', (req, res) => {
    const contratos = req.body.contratos;
  
    console.log('Contratos recebidos:', contratos); // Log para verificar os dados recebidos
  
    contratos.forEach((contrato) => {
      const sql = 'INSERT INTO Contratos SET ?';
      const values = {
        cnpj: contrato.orgaoEntidade.cnpj,
        dataInicial: contrato.dataInicial, // Certifique-se de que os campos estão corretos
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
  
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Erro ao inserir contrato:', err);
          return;
        }
        console.log('Contrato inserido com sucesso:', result.insertId);
      });
    });
  
    res.status(200).json({ message: 'Contratos recebidos com sucesso' });
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});