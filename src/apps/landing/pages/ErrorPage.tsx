import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
export const ErrorPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
      <Header />
      <div style={{ flexGrow: "1", display: 'flex', justifyContent: 'center',flexDirection: 'column' }}>
        <h3 style={{ textAlign: "center"}}>Error 404</h3>
      </div>
      <Footer />
    </div>
  );
};
