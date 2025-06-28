import { Route } from "react-router-dom";
import { Home } from "../apps/landing/pages/Home";
import { Producto } from "../apps/landing/pages/Producto";
import { Cart } from "../apps/landing/pages/Cart";
import { Categoria } from "../apps/landing/pages/Categoria";
import { ErrorPage } from "../apps/landing/pages/ErrorPage";
import { Search } from "../apps/landing/pages/Search";

export const PublicRoutes = () => [

    <Route path="/" element={<Home />} />,
    <Route path="/carrito" element={<Cart />} />,
    <Route path="/p/:productId" element={<Producto />} />,
    <Route path="/c/:categoriaName" element={<Categoria />} />,
    <Route path="/serch" element={<Search />} />,


    <Route path="*" element={<ErrorPage />} />
]
