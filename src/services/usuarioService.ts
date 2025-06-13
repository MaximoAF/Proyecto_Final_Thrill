// src/services/authService.ts
import axios from "axios";

const API_URL = "https://api-thrill-production.up.railway.app/api";

// --- Interfaces ---
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// --- Funciones de servicio ---
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  if (!response.data.token) throw new Error("Token no recibido del servidor");
  return response.data;
};

export const register = async (newUser: RegisterRequest): Promise<void> => {
  await axios.post(`${API_URL}/usuarios`, newUser);
};
