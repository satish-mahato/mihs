import "./App.css";
import Footer from "./Components/Footer";

import Home from "./Components/Home";
import PopUpModal from "./Components/LatestFilePopup";

function App() {
  return (
    <>
      <PopUpModal />
      
      <Home />
      <Footer />
    </>
  );
}

export default App;
