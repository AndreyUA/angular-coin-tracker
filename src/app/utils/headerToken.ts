export const createBearerToken = (): string =>
  `Bearer ${localStorage.getItem('token')}`;
