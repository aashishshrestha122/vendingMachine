import http from '../utils/http';

export const getOnlinePartners = async () => {
	const { data } = await http.get('/online-partners');

	return data;
}
