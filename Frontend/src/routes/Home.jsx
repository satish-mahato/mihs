import Slider from "../Homepage/Slider.jsx";
import AboutUs from "../Homepage/AboutUs.jsx";
import SliderSection from "../Homepage/Official.jsx";

import FileTable from "../Homepage/Filetable.jsx";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 relative">
        <Slider />
        <AboutUs />
        <SliderSection />
        <FileTable />
      </div>
    </div>
  );
}

export default Home;
