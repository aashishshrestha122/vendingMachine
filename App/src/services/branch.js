import http from '../utils/http';

export const getBranches = async () => {
  const { data } = await http.get('/branch');
  
  return data;
}
