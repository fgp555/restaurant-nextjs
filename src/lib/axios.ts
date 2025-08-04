// "use client"; // Asegura uso solo en cliente (opcional si lo importas dentro de useEffect)

// import axios from "axios";
// import config from "@/config"; // Usa tu archivo con process.env

// const axiosInstance = axios.create({
//   baseURL: config.apiBaseUrl,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor para agregar token si existe
// axiosInstance.interceptors.request.use(
//   (req) => {
//     if (typeof window !== "undefined") {
//       const accessToken = localStorage.getItem("accessToken");
//       if (accessToken) {
//         req.headers.Authorization = `Bearer ${accessToken}`;
//       }
//     }
//     return req;
//   },
//   (err) => Promise.reject(err)
// );

// // Interceptor de respuesta para renovar token
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (typeof window !== "undefined" && error.response?.status === 401 && !error.config._retry) {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         error.config._retry = true;
//         try {
//           const res = await axios.post(
//             `${config.apiBaseUrl}/auth/refresh-token`,
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${refreshToken}`,
//               },
//             }
//           );

//           const newAccessToken = res.data.accessToken;
//           localStorage.setItem("accessToken", newAccessToken);
//           error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axiosInstance(error.config);
//         } catch (refreshError) {
//           localStorage.removeItem("accessToken");
//           localStorage.removeItem("refreshToken");
//           window.location.href = "/"; // O /login
//           return Promise.reject(refreshError);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// // lib/axiosInstance.ts
// import axios from 'axios';

// const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

// const axiosInstance = axios.create({
//   baseURL: 'https://express-js-login.onrender.com/api',
//   headers: {
//     Authorization: token ? `Bearer ${token}` : '',
//   },
// });

// export default axiosInstance;
import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken } from './tokenUtils';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
          refreshToken: getRefreshToken(),
        });

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
