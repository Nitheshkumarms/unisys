import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
});

// Inventory API
export const fetchInventory = async () => {
  const response = await api.get('/inventory');
  return response.data;
};

export const updateInventory = async (data: { productId: string; quantity: number }) => {
  const response = await api.post('/inventory/update', data);
  return response.data;
};

// Warehouse API
export const fetchWarehouseData = async () => {
  const response = await api.get('/warehouse');
  return response.data;
};

// Predictions API
export const fetchPredictions = async () => {
  const response = await api.get('/predictions');
  return response.data;
};