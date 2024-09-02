import axios from "axios";

const api = axios.create({
  baseURL: "https://pncp.gov.br/api/consulta/v1/contratos",
});

api.interceptors.request.use(async config => {
  // Declaramos um token manualmente para teste.
  const token = "93409181";

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;