export const login = (id, password) => {
  const adminId = localStorage.getItem('adminId') || 'meridin college';
  const adminPass = localStorage.getItem('adminPass') || 'meridian@123';

  if (id === adminId && password === adminPass) {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const updateCredentials = (newId, newPassword) => {
  localStorage.setItem('adminId', newId);
  localStorage.setItem('adminPass', newPassword);
  return true;
};
