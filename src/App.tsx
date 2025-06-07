import { Route, Routes } from "react-router-dom";
import { Home } from "./apps/landing/pages/Home";
import { Ingreso } from "./apps/landing/pages/Ingreso";
import { ErrorPage } from "./apps/landing/pages/ErrorPage";
import { Cart } from "./apps/landing/pages/Cart";
import { Producto } from "./apps/landing/pages/Producto";
import { Admin } from "./apps/landing/pages/Admin";
<<<<<<< HEAD
import { Categoria } from "./apps/landing/pages/Categoria";
=======
import { DashboardAdmin } from './apps/landing/components/DashboardAdmin';
import { EditarProducto } from "./apps/landing/components/EditarProducto";
import { CrearProducto } from "./apps/landing/components/FormulariosProducto/CrearProducto";
import { EditarProductoForm } from "./apps/landing/components/FormulariosProducto/EditarProductoForm";
>>>>>>> 44a7e372b06a005ee36e0ea676aa7d5516dda2d5

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingreso" element={<Ingreso />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/p/:productId" element={<Producto/>}/>
      <Route path="/c/:categoriaName" element={<Categoria/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/editar-producto" element={<EditarProducto/>}/>
      <Route path="/formulario-creacion" element={<CrearProducto/>}/>
      <Route path="/formulario-editar" element={<EditarProductoForm/>}/>
    </Routes>
  );
};
