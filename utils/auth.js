
export const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');
    return accessToken && userRole;
  };

  export const isAdmin = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === "ADMIN";
  };