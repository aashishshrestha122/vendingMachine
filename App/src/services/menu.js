import http from '../utils/http';

export const getAllMenus = async () => {
  const { data } = await http.get('/menu');

  return data;
}
