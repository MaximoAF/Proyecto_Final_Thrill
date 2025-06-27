import { Route } from "react-router-dom";
import { Admin } from "../apps/landing/pages/Admin";
import { DashboardAdmin } from "../apps/landing/components/DashboardAdmin";
import { EditarProducto } from "../apps/landing/components/ProductosAdmin";
import { CategoriasAdmin } from "../apps/landing/components/CategoriasAdmin";
import { ProtectedRoute } from "./ProtectedRoute";
import { Perfil } from "../apps/landing/pages/Perfil";
import { Ingreso } from "../apps/landing/pages/Ingreso";
import { IUsuario } from "../types/IUsuario";

export const PrivateRoutes = (isAdmin: boolean, sesion:IUsuario | null) => [
  <Route
    path="/admin"
    element={
      <ProtectedRoute isAllowed={isAdmin}>
        <Admin />
      </ProtectedRoute>
    }
  />,
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute isAllowed={isAdmin}>
        <DashboardAdmin />
      </ProtectedRoute>
    }
  />,
  <Route
    path="/admin/producto"
    element={
      <ProtectedRoute isAllowed={isAdmin}>
        <EditarProducto />
      </ProtectedRoute>
    }
  />,
  <Route
    path="/admin/categorias"
    element={
      <ProtectedRoute isAllowed={isAdmin}>
        <CategoriasAdmin />
      </ProtectedRoute>
    }
  />,
  <Route
    path="/perfil"
    element={
      <ProtectedRoute isAllowed={sesion !== null} redirectTo="/ingreso">
        <Perfil />
      </ProtectedRoute>
    }
  />,

  <Route
    path="/ingreso"
    element={
      <ProtectedRoute isAllowed={sesion === null} redirectTo="/perfil">
        <Ingreso />
      </ProtectedRoute>
    }
  />
]

