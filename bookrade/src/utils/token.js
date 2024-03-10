
export const getToken = () => {
  const tokenData = localStorage.getItem('token');
  console.log(tokenData)
  return tokenData? tokenData: null;
};
