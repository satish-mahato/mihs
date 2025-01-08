import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-blue-100 text-blue-900">
      {/* Top Bar */}
      <div className="bg-blue-200">
        <div className="container mx-auto flex justify-between items-center px-6 py-2 text-sm">
          <div className="flex space-x-4 items-center">
            <a
              href="mailto:mihs@mihs.edu.np"
              className="flex items-center space-x-2"
            >
              <i className="fa-solid fa-envelope"></i>
              <span>mihs@mihs.edu.np</span>
            </a>
            <a href="tel:041-590867" className="flex items-center space-x-2">
              <i className="fa-solid fa-phone"></i>
              <span>041-590867/68</span>
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100064171027170&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-blue-100">
        <div className="container mx-auto flex justify-between items-center py-4 px-6 ">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="/assets/logo.png" // Corrected path for build
              alt="Logo"
              className="w-14.2 h-14 rounded-full border border-blue-900 p-1"
            />
            <div>
              <h1 className="text-2xl font-bold md:text-xl">
                Madhesh Institute of Health Science
              </h1>
              <p className="text-sm">Janakpurdham, Madhesh Province, Nepal</p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            className="lg:hidden text-blue-900 focus:outline-none"
            onClick={toggleMenu}
          >
            <i className={`fas ${menuOpen ? "" : "fa-bars"} text-2xl`}></i>
          </button>

          {/* Navigation Menu */}
          <nav
            className={`${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 fixed inset-y-0 left-0 w-3/4 lg:w-auto bg-blue-100 lg:bg-transparent lg:static flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 text-blue-900 text-sm font-medium transition-transform duration-300 ease-in-out z-50`}
            style={{
              "@media (max-width: 1024px)": {
                width: "100%",
                backgroundColor: "blue-200",
              },
              "@media (max-width: 768px)": {
                width: "100%",
                backgroundColor: "blue-300",
                paddingLeft: menuOpen ? "1rem" : "", // Add padding when menu is open
              },
            }}
          >
            {/* Close button for mobile */}
            {menuOpen && (
              <button
                className="self-end text-xl p-4 m-2 lg:hidden"
                onClick={closeMenu}
              >
                <i className="fas fa-times"></i>
              </button>
            )}

            {/* Navigation Links */}
            {[
              { name: "Home", href: "#home" },
              { name: "About Us", href: "#about" },
              // { name: "Officials", href: "#online" },
              { name: "Notices", href: "#admission" },
              { name: "Academics", href: "#academics" },
              { name: "Gallery", href: "#schools" },
              { name: "News & Events", href: "#news" },
              { name: "Contact Us", href: "#contact" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="text-lg lg:text-base lg:space-x-4 hover:text-blue-500"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
