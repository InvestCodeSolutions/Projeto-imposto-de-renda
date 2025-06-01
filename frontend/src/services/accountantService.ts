import api from './api';

export const accountantService = {
  listClients: async () => {
    const response = await api.get('/contador/clientes');
    return response.data;
  },

  getPendingRequests: async () => {
    const response = await api.get('/contador/solicitacoes');
    return response.data;
  },

  requestAuthorization: async (accountantId: string) => {
    const response = await api.post('/contador/autorizar-cliente', { contadorId: accountantId });
    return response.data;
  },

  approveRequest: async (requestId: string) => {
    const response = await api.put(`/contador/autorizar-cliente/${requestId}/aprovar`);
    return response.data;
  },

  rejectRequest: async (requestId: string) => {
    const response = await api.put(`/contador/autorizar-cliente/${requestId}/rejeitar`);
    return response.data;
  },
};