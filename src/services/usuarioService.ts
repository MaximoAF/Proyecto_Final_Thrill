// src/services/authService.ts
import axios from "axios";
import { ILogin, IRegister, IUsuario } from "../types/IUsuario";
import { BaseService } from "./BaseService";

const API_URL = import.meta.env.VITE_API_URL;

export const usuarioService = new BaseService<IUsuario>("/usuarios");

//Interface
export interface LoginResponse {
  token: string;
  usuario: IUsuario;
}

// Funciones de sesion
export const login = async (
  credentials: ILogin
): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/auth/login`, credentials);
  if (!res.data.token) throw new Error("Token no recibido del servidor");
  if (!res.data.usuario) throw new Error("Usuario no recibido del servidor");
  return res.data;
};

export const register = async (
  newUser: IRegister
): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/auth/register`, newUser);
  if (!res.data.token) throw new Error("Token no recibido del servidor");
  if (!res.data.usuario) throw new Error("Usuario no recibido del servidor");
  return res.data;
};
