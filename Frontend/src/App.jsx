import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import LatestFilePopup from "./Components/LatestFilePopup";
import { useState } from "react";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <button
          onClick={() => setShowPopup(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Show Latest Files
        </button>

        {showPopup && (
          <LatestFilePopup
            category="noti"
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
