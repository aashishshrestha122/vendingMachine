import http from '../utils/http';

export const login = async (name, password, branch) => {
  const { data } = await http.post('/auth/login', { name, password, branch });

  return data;
};

/**LOGOUT**/
export const logout = async (name, password) => {
  try {
    const data = "";
    // const { data } = await http.post("/auth/logout", { name, password });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  const { data } = await http.get('/user');

  return data;
}
