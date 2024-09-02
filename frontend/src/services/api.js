// Importa o módulo axios para realizar requisições HTTP
import axios from "axios";

// Cria uma instância do axios com a URL base da API
const api = axios.create({
  baseURL: "https://pncp.gov.br/api/consulta/v1/contratos", // URL base para as requisições
});

// Configura um interceptor de requisições para adicionar o token de autorização
api.interceptors.request.use(async config => {
  // Declara um token manualmente para teste (deve ser substituído por um token real em produção)
  const token = "93409181";

  // Verifica se o token está presente
  if (token) {
    // Define o header de autorização para todas as requisições feitas com essa instância do axios
    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  // Retorna a configuração da requisição modificada
  return config;
});

// Exporta a instância do axios configurada para uso em outros módulos
export default api;
