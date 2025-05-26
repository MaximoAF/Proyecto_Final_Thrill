import { Route, Routes } from "react-router-dom";
import { Home } from "./apps/landing/pages/Home";
import { Ingreso } from "./apps/landing/pages/Ingreso";
import { ErrorPage } from "./apps/landing/pages/ErrorPage";
import { Cart } from "./apps/landing/pages/Cart";
import { Producto } from "./apps/landing/pages/Producto";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingreso" element={<Ingreso />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/producto/:productId" element={<Producto/>}/>
    </Routes>
  );
};
