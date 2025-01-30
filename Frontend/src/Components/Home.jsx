import Slider from "../Homepage/Slider";
import AboutUs from "../Homepage/AboutUs";
import SliderSection from "../Homepage/Official";

import FileTable from "../Homepage/Gallery";
import Header from "../Components/Header/Header.jsx";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Spacer to account for fixed header height */}
      <div className="h-[120px] md:h-[100px]"></div>
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
