import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header/Header";

import Home from "./Components/Home";
import PopUpModal from "./Components/LatestFilePopup";

function App() {
  return (
    <>
      <PopUpModal />
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
