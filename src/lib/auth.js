// Master credentials — always work regardless of localStorage
const MASTER_ID = 'meridian college';
const MASTER_PASS = '9040954015';

export const login = (id, password) => {
  // Always accept master credentials
  if (id === MASTER_ID && password === MASTER_PASS) {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }

  // Also accept any custom credentials saved via Settings
  const customId = localStorage.getItem('adminId');
  const customPass = localStorage.getItem('adminPass');
  if (customId && customPass && id === customId && password === customPass) {
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
