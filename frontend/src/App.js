// Importa React e useState para gerenciar o estado do componente
import React, { useState } from 'react';
// Importa axios para fazer requisições HTTP
import axios from 'axios';
// Importa o arquivo de estilos CSS
import './App.css';

// URL base para as requisições ao back-end
const API_URL = 'http://localhost:5000/api';

function App() {
  // Declara estados para armazenar dados e controle do componente
  const [user, setUser] = useState([]); // Armazena a lista de contratos
  const [orgaoInfo, setOrgaoInfo] = useState(null); // Armazena informações do órgão
  const [cnpj, setCnpj] = useState(''); // Armazena o CNPJ informado pelo usuário
  const [dataInicial, setDataInicial] = useState(''); // Armazena a data inicial para a busca
  const [dataFinal, setDataFinal] = useState(''); // Armazena a data final para a busca
  const [pagina, setPagina] = useState(1); // Armazena o número da página para a busca
  const [loading, setLoading] = useState(false); // Controle de carregamento
  const [totalValue, setTotalValue] = useState(0); // Armazena o valor total dos contratos

  // Função para buscar contratos da API externa
  const fetchContracts = async () => {
    setLoading(true); // Inicia o estado de carregamento
    try {
      // Faz uma requisição GET para a API de contratos
      const response = await axios.get("https://pncp.gov.br/api/consulta/v1/contratos", {
        params: {
          cnpj,
          dataInicial,
          dataFinal,
          pagina,
          tamanhoPagina: 500
        }
      });

      if (response.status === 200) {
        // Filtra contratos com base no CNPJ fornecido
        const filteredContracts = response.data.data.filter(item => item.orgaoEntidade.cnpj === cnpj);

        if (filteredContracts.length > 0) {
          // Define as informações do órgão se houver contratos filtrados
          setOrgaoInfo(filteredContracts[0].orgaoEntidade);
        }

        // Atualiza a lista de contratos
        setUser(filteredContracts);

        // Envia contratos para o back-end
        await sendContractsToBackend(filteredContracts);

        // Calcula o valor total dos contratos
        const total = await calculateTotalContractsValue(filteredContracts);
        setTotalValue(total); // Atualiza o valor total
      }
    } catch (err) {
      console.error("Ops! Ocorreu um erro: ", err); // Log de erro
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  // Função para enviar contratos para o back-end
  const sendContractsToBackend = async (contracts) => {
    try {
      // Faz uma requisição POST para enviar contratos ao back-end
      await axios.post(`${API_URL}/contratos`, { contratos: contracts });
      console.log('Contratos enviados com sucesso para o back-end');
    } catch (err) {
      console.error('Erro ao enviar contratos para o back-end:', err); // Log de erro
    }
  };

  // Função para calcular o valor total dos contratos
  const calculateTotalContractsValue = (contracts) => {
    return contracts.reduce((total, contrato) => {
      // Converte o valor inicial para número e acumula no total
      const valor = parseFloat(contrato.valorInicial) || 0;
      return total + valor;
    }, 0);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    fetchContracts(); // Chama a função para buscar contratos
  };

  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <label>
            CNPJ:
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)} // Atualiza o estado do CNPJ
              required
            />
          </label>
          <label>
            Data Inicial (AAAAMMDD):
            <input
              type="text"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)} // Atualiza o estado da data inicial
              required
            />
          </label>
          <label>
            Data Final (AAAAMMDD):
            <input
              type="text"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)} // Atualiza o estado da data final
              required
            />
          </label>
          <label>
            Página:
            <input
              type="number"
              value={pagina}
              onChange={(e) => setPagina(e.target.value)} // Atualiza o estado da página
              required
              min="1"
            />
          </label>
          <button type="submit" disabled={loading}>Buscar</button>
          {loading && <p>Carregando...</p>} {/* Exibe mensagem de carregamento */}
        </form>

        {orgaoInfo && (
          <div className="orgao-info">
            <h2>Informações do Órgão</h2>
            <p><strong>CNPJ:</strong> {orgaoInfo.cnpj}</p>
            <p><strong>Razão Social:</strong> {orgaoInfo.razaoSocial}</p>
            {/* Exibe o valor total dos contratos junto com as informações do órgão */}
            {totalValue > 0 && (
              <div className="total-value">
                <h2>Valor Total dos Contratos</h2>
                <p><strong>Total:</strong> R$ {totalValue.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="box">
        {user.length > 0 ? (
          user.map((item, index) => (
            <div key={index} className="item">
              <p><strong>Orgão:</strong> {item.orgaoEntidade.razaoSocial}</p>
              <p><strong>Data de Vigência Inicial:</strong> {item.dataVigenciaInicio}</p>
              <p><strong>Data de Vigência Final:</strong> {item.dataVigenciaFim}</p>
              <p><strong>Fornecedor:</strong> {item.nomeRazaoSocialFornecedor}</p>
              <p><strong>Objeto do Contrato:</strong> {item.objetoContrato}</p>
              <p><strong>Valor Inicial:</strong> R$ {item.valorInicial}</p>
            </div>
          ))
        ) : (
          <p>Nenhum contrato encontrado para o CNPJ informado.</p>
        )}
      </div>
    </div>
  );
}

export default App;
