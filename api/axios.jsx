// // import axios from "axios";

// // const API = axios.create({
// //   baseURL: "http://localhost:8000/api",
// // });

// // API.interceptors.request.use((req) => {
// //   const token = localStorage.getItem("token");
// //   if (token) req.headers.Authorization = `Bearer ${token}`;
// //   return req;
// // });

// // export default API;
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api', // Matches your backend URL exactly
// });

// // This automatically adds your JWT token to every request after login
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

// This sends your login token automatically with every chat message
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;