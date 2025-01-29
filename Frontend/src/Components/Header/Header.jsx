import { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !document.querySelector("nav").contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="bg-gradient-to-b from-blue-100 to-blue-200 shadow-lg w-full fixed top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto flex justify-between items-center px-4 py-2 text-sm">
          <div className="flex space-x-4 items-center">
            <a
              href="mailto:mihs@mihs.edu.np"
              className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
            >
              <i className="fa-solid fa-envelope text-sm"></i>
              <span>mihs@mihs.edu.np</span>
            </a>
            <a
              href="tel:041-590867"
              className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
            >
              <i className="fa-solid fa-phone"></i>
              <span>041-590867/68</span>
            </a>
          </div>
          <div className="hidden sm:flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100075611130871"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-12 h-12 rounded-full border-2 border-blue-900 p-1"
          />
          <div className="block sm:block">
            <h1 className="text-lg font-bold text-blue-900 sm:text-xl">
              Madhesh Institute of Health Sciences
            </h1>
            <p className="text-[0.7rem] text-blue-700 sm:text-xs">
              Janakpurdham, Madhesh Province, Nepal
            </p>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-2xl text-blue-900 focus:outline-none hover:text-blue-500 transition-colors"
          onClick={toggleMenu}
        >
          <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 fixed lg:static top-0 right-0 w-3/4 lg:w-auto h-screen lg:h-auto bg-blue-100 lg:bg-transparent shadow-xl lg:shadow-none z-50 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col lg:flex-row h-full lg:items-center lg:space-x-6 p-6 lg:p-0">
            <button
              className="self-end text-2xl p-2 lg:hidden text-blue-900 hover:text-blue-500"
              onClick={toggleMenu}
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 mt-8 lg:mt-0 text-blue-900">
              <a
                href="#home"
                className="hover:text-blue-500 transition-colors text-lg font-semibold"
                onClick={closeMenu}
              >
                Home
              </a>
              <a
                href="#about"
                className="hover:text-blue-500 transition-colors text-lg font-semibold"
                onClick={closeMenu}
              >
                About Us
              </a>

              <div className="relative">
                <button
                  className="hover:text-blue-500 flex items-center space-x-2 text-lg font-semibold transition-colors"
                  onClick={toggleDropdown}
                >
                  Academics <i className="fas fa-chevron-down text-sm"></i>
                </button>
                {dropdownOpen && (
                  <DropdownMenu closeMenu={() => setDropdownOpen(false)} />
                )}
              </div>

              <a
                href="#notices"
                className="hover:text-blue-500 transition-colors text-lg font-semibold"
                onClick={closeMenu}
              >
                Notices
              </a>
              <a
                href="#contact"
                className="hover:text-blue-500 transition-colors text-lg font-semibold"
                onClick={closeMenu}
              >
                Contact Us
              </a>
            </div>

            <div className="mt-auto lg:hidden flex space-x-4 justify-center py-8 border-t border-blue-200">
              <a
                href="https://www.facebook.com/profile.php?id=100075611130871"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-900 hover:text-blue-500 text-xl"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-900 hover:text-blue-500 text-xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;