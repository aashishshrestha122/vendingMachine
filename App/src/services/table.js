import http from '../utils/http';

export const getTables = async () => {
  const { data } = await http.get('/table');

  return data;
}
