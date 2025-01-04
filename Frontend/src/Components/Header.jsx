import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-100 text-blue-900">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-2 text-sm bg-blue-200">
        <div className="flex space-x-4">
          <span>
            Phone: 977-11-415100, 977-11-415200, 977-9801210035, 977-11-415005
          </span>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-blue-100">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="logo-2-300x300.png" // Update to the correct path for your logo
              alt="Logo"
              className="w-14 h-14 rounded-full border border-blue-900 p-1"
            />
            <h1 className="text-2xl font-bold">
              Madhesh Health Science Institute
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-6 text-blue-900 text-sm font-medium">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About
            </a>
            <a href="#online" className="hover:text-blue-600">
              Online Services
            </a>
            <a href="#admission" className="hover:text-blue-600">
              Admission
            </a>
            <a href="#academics" className="hover:text-blue-600">
              Academics
            </a>
            <a href="#schools" className="hover:text-blue-600">
              Schools & Colleges
            </a>
            <a href="#news" className="hover:text-blue-600">
              News & Notices
            </a>
          </nav>

          {/* Search Icon */}
          <div className="text-blue-900 text-lg cursor-pointer hover:text-blue-600">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
