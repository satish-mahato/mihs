import { Outlet } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main style={{ paddingTop: "var(--header-height, 176px)" }}>
        <Outlet /> {/* This is where child routes render */}
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
