import { Route, Routes } from "react-router-dom";
import { Home } from "./apps/landing/pages/Home";
import { Ingreso } from "./apps/landing/pages/Ingreso";
import { ErrorPage } from "./apps/landing/pages/ErrorPage";
import { Cart } from "./apps/landing/pages/Cart";
import { Producto } from "./apps/landing/pages/Producto";
import { Admin } from "./apps/landing/pages/Admin";
import { Categoria } from "./apps/landing/pages/Categoria";
import { DashboardAdmin } from "./apps/landing/components/DashboardAdmin";
import { EditarProducto } from "./apps/landing/components/ProductosAdmin";
import { CategoriasAdmin } from "./apps/landing/components/CategoriasAdmin";
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingreso" element={<Ingreso />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/p/:productId" element={<Producto />} />
      <Route path="/c/:categoriaName" element={<Categoria />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/producto" element={<EditarProducto />} />
      <Route path="/admin/categorias" element={<CategoriasAdmin />} />
    </Routes>
  );
};
