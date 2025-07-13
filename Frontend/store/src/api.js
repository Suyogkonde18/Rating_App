const API = import.meta.env.VITE_API || 'http://localhost:5000/api';

const fetchAPI = async (url, method = 'GET', token = null, data = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  // ======= Debug logs =======
  console.log('========= API CALL =========');
  console.log('Fetching:', `${API}${url}`);
  console.log('Method:', method);
  console.log('Token:', token);
  if (data) console.log('Payload:', data);
  console.log('============================');
  // ==========================

  const res = await fetch(`${API}${url}`, options);

  if (!res.ok) {
    const error = await res.json();
    console.error('API Error Response:', error);
    throw new Error(error.message || 'API Error');
  }

  const result = await res.json();

  // Optional: Log the API result
  console.log('API Success Response:', result);

  return result;
};

// ====================== AUTH ======================
export const login = (data) => fetchAPI('/auth/login', 'POST', null, data);
export const register = (data) => fetchAPI('/auth/register', 'POST', null, data);

// ====================== ADMIN ======================
export const getDashboard = (token) => fetchAPI('/admin/dashboard', 'GET', token);
export const addUser = (token, userData) => fetchAPI('/admin/add-user', 'POST', token, userData);
export const addStore = (token, storeData) => fetchAPI('/admin/add-store', 'POST', token, storeData);

// ====================== USER ======================
export const getStores = (token) => fetchAPI('/user/stores', 'GET', token);
export const submitRating = (token, storeId, rating) =>
  fetchAPI('/user/submit-rating', 'POST', token, { storeId, rating });

// ====================== STORE OWNER ======================
export const getStoreRatings = (token) => fetchAPI('/store/ratings', 'GET', token);
