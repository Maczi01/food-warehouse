let instance;
export const initializeHttpClient = (client) => {
  instance = client;
};

export const getHttpClient = () => {
  return instance;
};

export const useHttpClient = () => {
  return getHttpClient();
};
