import API from './axiosConfig';

export const getMyExchanges = () => API.get('/exchanges');
export const createExchange = (data) => API.post('/exchanges', data);
export const updateExchangeStatus = (id, status) =>
  API.put(`/exchanges/${id}`, { status });