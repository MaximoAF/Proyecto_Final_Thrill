import { Routes } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { useSesionStore } from "./store/slices/SesionStore";
import { PublicRoutes } from "./routes/PublicRoutes";
export const App = () => {
  const sesion = useSesionStore((state) => state.sesion);
  const isAdmin = sesion ? sesion.rol === "ADMIN" : false;
  return (
    <Routes>
      {PrivateRoutes(isAdmin, sesion)}
      {PublicRoutes()}
    </Routes>
  );
};
