// src/utils/validations.ts

export const validateEmail = (email: string) =>
  /\S+@\S+\.\S+/.test(email) ? "" : "Email inválido";

export const validatePassword = (password: string) =>
  password.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres";

export const validateConfirmPassword = (password: string, confirm: string) =>
  password === confirm ? "" : "Las contraseñas no coinciden";
