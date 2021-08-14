import http from '../utils/http';

export const confirmOrder = async (orderInfo) => {
	const { data } = await http.post('/confirm-order', { orderInfo });

	return data;
}
