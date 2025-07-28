// src/config/index.ts
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const config = {
  apiBaseUrl: baseUrl + "/api",
  restaurantName: "Tu Restaurante",
};

export default config;
