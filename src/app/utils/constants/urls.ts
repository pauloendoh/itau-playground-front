const apiBaseUrl = 'http://localhost:5079/api';

export const urls = {
  pages: {
    index: '',
    novaSolicitacao: 'solicitacoes/nova',
  },
  api: {
    authLogin: `${apiBaseUrl}/auth/login`,
    clienteByDocumento: (documento: string) =>
      `${apiBaseUrl}/clientes/${documento}`,
    formularios: `${apiBaseUrl}/formularios`,
  },
} as const;
