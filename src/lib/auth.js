// Master credentials — always work regardless of localStorage
const MASTER_ID = 'meridian college';
const MASTER_PASS = '9040954015';

// Purely in-memory session state (banking-grade transient security)
// This ensures that any direct URL typing or browser refresh forces re-authentication
let inMemoryAuthenticated = false;

export const login = (id, password) => {
  // Always accept master credentials
  if (id === MASTER_ID && password === MASTER_PASS) {
    inMemoryAuthenticated = true;
    return true;
  }

  // Also accept any custom credentials saved via Settings
  const customId = localStorage.getItem('adminId');
  const customPass = localStorage.getItem('adminPass');
  if (customId && customPass && id === customId && password === customPass) {
    inMemoryAuthenticated = true;
    return true;
  }

  return false;
};

export const logout = () => {
  inMemoryAuthenticated = false;
  // Clear any residual session or local storage artifacts
  sessionStorage.removeItem('isAuthenticated');
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = () => {
  return inMemoryAuthenticated === true;
};

export const updateCredentials = (newId, newPassword) => {
  localStorage.setItem('adminId', newId);
  localStorage.setItem('adminPass', newPassword);
  return true;
};
