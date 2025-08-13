//
// PUBLIC_INTERFACE
// getConfig exposes runtime configuration sourced from environment variables.
//
export const getConfig = () => {
  /** Returns runtime configuration derived from environment variables. */
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
  return {
    API_BASE_URL,
    APP_NAME: 'Minimal Todo',
  };
};

// PUBLIC_INTERFACE
export const { API_BASE_URL, APP_NAME } = getConfig();
