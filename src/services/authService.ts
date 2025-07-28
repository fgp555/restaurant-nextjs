import axiosInstance from "@/lib/axios";
import axios from "axios";

export const sendForgotPasswordEmail = async (email: string, baseURL: string) => {
  const res = await axiosInstance.post("/auth/forgot-password", {
    email,
    baseURL,
  });
  return res.data;
};

export const restorePassword = async (resetToken: string, newPassword: string) => {
  const res = await axiosInstance.post("/auth/restore-password", {
    resetToken,
    newPassword,
  });
  return res.data;
};

// export const login = async (email: string, password: string) => {
//   const res = await axios.post("/api/auth/login", {
//     email,
//     password,
//   });
//   return res.data;
// };