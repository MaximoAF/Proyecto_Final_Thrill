import { Route, Routes } from "react-router-dom";
import { Home } from "./apps/landing/pages/Home";
import { Ingreso } from "./apps/landing/pages/Ingreso";
import { ErrorPage } from "./apps/landing/pages/ErrorPage";
import { Cart } from "./apps/landing/pages/Cart";
import { Producto } from "./apps/landing/pages/Producto";
import { Admin } from "./apps/landing/pages/Admin";
import { DashboardAdmin } from './apps/landing/components/DashboardAdmin';
import { EditarProducto } from "./apps/landing/components/EditarProducto";
import { CrearProducto } from "./apps/landing/components/FormulariosProducto/CrearProducto";
import { EditarProductoForm } from "./apps/landing/components/FormulariosProducto/EditarProductoForm";
import { CategoriasAdmin } from "./apps/landing/components/CategoriasAdmin";
import { UsuariosAdmin } from "./apps/landing/components/usuariosAdmin";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingreso" element={<Ingreso />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/producto/:productId" element={<Producto/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/editar-producto" element={<EditarProducto />}/>
      <Route path="/formulario-creacion" element={<CrearProducto />}/>
      <Route path="/formulario-editar" element={<EditarProductoForm />}/>
      <Route path="/categorias" element={<CategoriasAdmin />}/>
      <Route path="/usuarios" element={<UsuariosAdmin />}/>

    </Routes>
  );
};
