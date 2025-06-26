// src/config/index.ts
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://giomr.site";

const config = {
  apiBaseUrl: baseUrl + "/api",
  restaurantName: "Tu Restaurante",
};

export default config;
