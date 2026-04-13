

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const LISTURL = {
  getList: `${API_BASE_URL}/items`,
  createItem: `${API_BASE_URL}/items`,
  getItem: (id: number) => `${API_BASE_URL}/items/${id}`,
  updateItem: (id: number) => `${API_BASE_URL}/items/${id}`,
  deleteItem: (id: number) => `${API_BASE_URL}/items/${id}`,
};

export default LISTURL;

