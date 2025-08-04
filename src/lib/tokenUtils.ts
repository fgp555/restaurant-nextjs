export const getAccessToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getRefreshToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};
