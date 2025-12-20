import Cookies from 'js-cookie';

const getClientCookie = (name: string) => {
  return Cookies.get(name);
};

const setClientCookie = (name: string, value: string) => {
  Cookies.set(name, value);
};

const deleteClientCookie = (name: string) => {
  Cookies.remove(name);
};

export { getClientCookie, setClientCookie, deleteClientCookie };
