export const getUser = () => {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    return isAdmin;
  };
  