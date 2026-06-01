const apiBaseUrl = 'http://localhost:5079/api';

export const urls = {
  api: {
    authLogin: `${apiBaseUrl}/auth/login`,
  },
} as const;
