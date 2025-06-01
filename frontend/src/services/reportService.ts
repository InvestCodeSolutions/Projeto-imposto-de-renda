import api from './api';

export const reportService = {
  generateReport: async (clientId: string, year?: number) => {
    const response = await api.get(`/relatorios/cliente/${clientId}/gerar-pdf`, {
      params: { ano: year },
      responseType: 'blob',
    });
    return response.data;
  },

  getInconsistencies: async () => {
    const response = await api.get('/analise/inconsistencias');
    return response.data;
  },

  getDashboardData: async () => {
    const response = await api.get('/relatorios/dashboard');
    return response.data;
  },
};