import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-page">
      <Header />
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <h3>Error 404</h3>

        <button className="button-black" onClick={() => navigate("/")}>
          Volver a la tienda
        </button>
      </div>
      <Footer />
    </div>
  );
};
