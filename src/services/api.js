// services/api.js
const API_BASE_URL = 'https://dummyjson.com';

// Genel bir API çağrısı fonksiyonu oluşturuyoruz
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
};

// API fonksiyonlarını tanımlıyoruz
export const getUsers = () => apiCall('/users');
export const getUserOrders = (userId) => apiCall(`/users/${userId}/orders`);
export const addUser = (user) => apiCall('/users/add', 'POST', user);
export const updateUser = (userId, user) => apiCall(`/users/${userId}`, 'PUT', user);
export const deleteUser = (userId) => apiCall(`/users/${userId}`, 'DELETE');
