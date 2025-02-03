import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import Gallery from "./Homepage/Gallery";
import FileTable from "./Homepage/Filetable";
import ContactPage from "./Homepage/ContactUs";
import AboutUs from "./Homepage/AboutUs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="notices" element={<FileTable />} />
        <Route path="contact-us" element={<ContactPage />} />
        <Route path="about-us" element={<AboutUs />} />
        {/* <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="notices" element={<Notices />} />
         */}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
