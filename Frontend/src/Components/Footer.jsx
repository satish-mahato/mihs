const Footer = () => {
  return (
    <footer className="bg-blue-200 text-blue-900 py-10 px-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* About Section */}
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <img
              src="/assets/logo.png"
              alt="Logo"
              style={{ width: "5.75rem", height: "5.75rem" }}
              className="rounded-full border"
            />
            <p className="text-sm mt-4">
              Established in 2077, we have a long history of excellence and
              innovation in our field. We aim to provide high-quality services
              to our community and beyond.
            </p>
          </div>

          {/* Useful Links Section */}
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Useful Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-blue-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="w-full md:w-1/3 px-4">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <p className="mb-2">
              <i className="fa-solid fa-phone mr-2"></i>
              041-590867/68
            </p>
            <p className="mb-2">
              <i className="fa-solid fa-envelope mr-2"></i>
              mihs@mihs.edu.np
            </p>
            <p className="mb-2">
              <i className="fa-solid fa-map-marker-alt mr-2"></i>
              Janakpurdham, Madhesh Province, Nepal
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue-200 text-base text-center mt-1 font-serif pt-2">
        <p>
          &copy; {new Date().getFullYear()} Madhesh Institute of Health Science.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
