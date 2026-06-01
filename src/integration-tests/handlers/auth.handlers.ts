import { http, HttpResponse } from 'msw';
import { urls } from '../../app/utils/constants/urls';

export const imocks = {
  loggedUser: {
    id: 'user-123',
    username: 'testuser',
    email: 'testuser@example.com',
    createdAt: '2024-01-15T10:00:00Z',
    token: 'mock-jwt-token',
  },
} as const;

export const authHandlers = [
  http.post(urls.api.authLogin, () => {
    return HttpResponse.json(imocks.loggedUser);
  }),
];
