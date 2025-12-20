import { cookies } from 'next/headers';

const getServerCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

const setServerCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
};

const deleteServerCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

export { getServerCookie, setServerCookie, deleteServerCookie };
