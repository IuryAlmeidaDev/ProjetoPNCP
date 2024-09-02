import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api'; // URL do seu back-end

function App() {
  const [user, setUser] = useState([]);
  const [orgaoInfo, setOrgaoInfo] = useState(null);
  const [cnpj, setCnpj] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  const fetchContracts = async () => {
    setLoading(true);
    try {
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
        const filteredContracts = response.data.data.filter(item => item.orgaoEntidade.cnpj === cnpj);

        if (filteredContracts.length > 0) {
          setOrgaoInfo(filteredContracts[0].orgaoEntidade);
        }

        setUser(filteredContracts);
        await sendContractsToBackend(filteredContracts); // Envia os contratos para o back-end
        const total = await calculateTotalContractsValue(filteredContracts); // Calcula o valor total dos contratos
        setTotalValue(total);
      }
    } catch (err) {
      console.error("Ops! Ocorreu um erro: ", err);
    } finally {
      setLoading(false);
    }
  };

  const sendContractsToBackend = async (contracts) => {
    try {
      await axios.post(`${API_URL}/contratos`, { contratos: contracts });
      console.log('Contratos enviados com sucesso para o back-end');
    } catch (err) {
      console.error('Erro ao enviar contratos para o back-end:', err);
    }
  };

  const calculateTotalContractsValue = (contracts) => {
    return contracts.reduce((total, contrato) => {
      const valor = parseFloat(contrato.valorInicial) || 0;
      return total + valor;
    }, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchContracts();
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
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
          </label>
          <label>
            Data Inicial (AAAAMMDD):
            <input
              type="text"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              required
            />
          </label>
          <label>
            Data Final (AAAAMMDD):
            <input
              type="text"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              required
            />
          </label>
          <label>
            Página:
            <input
              type="number"
              value={pagina}
              onChange={(e) => setPagina(e.target.value)}
              required
              min="1"
            />
          </label>
          <button type="submit" disabled={loading}>Buscar</button>
          {loading && <p>Carregando...</p>}
        </form>

        {orgaoInfo && (
          <div className="orgao-info">
            <h2>Informações do Órgão</h2>
            <p><strong>CNPJ:</strong> {orgaoInfo.cnpj}</p>
            <p><strong>Razão Social:</strong> {orgaoInfo.razaoSocial}</p>
            {/* Adicione outras informações relevantes do órgão aqui */}
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

      {totalValue > 0 && (
        <div className="total-value">
          <h2>Valor Total dos Contratos</h2>
          <p><strong>Total:</strong> R$ {totalValue.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
