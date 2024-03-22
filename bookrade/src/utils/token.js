
export const getToken = () => {
  const tokenData = localStorage.getItem('token');
  return tokenData? tokenData: null;
};
