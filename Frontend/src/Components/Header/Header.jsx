import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-blue-100 text-blue-900 w-full">
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
        </div>
      </div>

      {/* Navbar */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-12 h-12 rounded-full border border-blue-900 p-1"
          />
          <div>
            <h1 className="text-lg font-bold">
              Madhesh Institute of Health Science
            </h1>
            <p className="text-sm">Janakpurdham, Nepal</p>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col lg:flex lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 text-blue-900 text-lg font-medium fixed lg:static top-0 left-0 w-full lg:w-auto h-full lg:h-auto bg-blue-100 lg:bg-transparent z-50 lg:translate-x-0 transform transition-transform duration-300 ease-in-out`}
        >
          {/* Close Button for Mobile */}
          {menuOpen && (
            <button
              className="self-end text-2xl p-4 lg:hidden"
              onClick={toggleMenu}
            >
              <i className="fas fa-times"></i>
            </button>
          )}

          {/* Links */}
          <a href="#home" className="hover:text-blue-500" onClick={closeMenu}>
            Home
          </a>
          <a href="#about" className="hover:text-blue-500" onClick={closeMenu}>
            About Us
          </a>

          {/* Dropdown for Academics */}
          <div className="relative">
            <button
              className="hover:text-blue-500 flex items-center space-x-2"
              onClick={toggleDropdown}
            >
              Academics <i className="fas fa-chevron-down"></i>
            </button>
            {dropdownOpen && <DropdownMenu closeMenu={closeMenu} />}
          </div>

          <a
            href="#notices"
            className="hover:text-blue-500"
            onClick={closeMenu}
          >
            Notices
          </a>
          <a
            href="#contact"
            className="hover:text-blue-500"
            onClick={closeMenu}
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
