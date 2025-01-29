import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faHouse,
  faCircleInfo,
  faBookOpen,
  faGraduationCap,
  faAddressBook,
  faMapMarkerAlt,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-100 to-blue-200 relative pt-12">
      {/* Wave shape divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
        <svg 
          className="relative block h-12"
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
          className="fill-current text-blue-200"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          {/* About Section */}
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl transform transition duration-500 group-hover:scale-105 group-hover:rotate-3"
                />
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping-slow group-hover:animate-none"></div>
              </div>
              <h2 className="text-xl font-bold text-blue-900 mt-6 mb-2 tracking-wide">
                Madhesh Institute of Health Sciences
              </h2>
              <p className="text-sm text-blue-700 font-medium">
                Janakpurdham, Madhesh Province, Nepal
              </p>
            </div>
            <p className="mt-6 text-blue-800 leading-relaxed text-sm sm:text-base max-w-xs mx-auto lg:mx-0">
              Established in 2077, we have a long history of excellence and
              innovation in our field. We aim to provide high-quality services
              to your community and beyond.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="w-full lg:w-1/3 text-center">
            <h2 className="text-xl font-bold text-blue-900 mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-blue-400 after:rounded-full">
              Quick Links
            </h2>
            <ul className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                ["Home", "/", faHouse],
                ["About Us", "/about", faCircleInfo],
                ["Courses", "/courses", faBookOpen],
                ["Admission", "/admission", faGraduationCap],
                ["Contact", "/contact", faAddressBook],
              ].map(([name, href, icon]) => (
                <li key={name}>
                  <a
                    href={href}
                    className="flex items-center justify-center space-x-2 p-3 sm:p-2 rounded-xl bg-white/50 hover:bg-white transition-all shadow-sm hover:shadow-md text-blue-900 hover:text-blue-700"
                  >
                    <FontAwesomeIcon 
                      icon={icon} 
                      className="text-blue-500" 
                    />
                    <span className="font-medium">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="text-xl font-bold text-blue-900 mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 lg:after:left-0 after:-translate-x-1/2 lg:after:translate-x-0 after:w-16 after:h-1 after:bg-blue-400 after:rounded-full">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col items-center lg:items-start space-y-4">
                <div className="flex items-center space-x-3 bg-white/50 p-4 rounded-xl w-full max-w-xs">
                  <div className="p-3 bg-blue-500 rounded-lg shadow-sm">
                    <FontAwesomeIcon 
                      icon={faMapMarkerAlt} 
                      className="text-white text-lg" 
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Our Campus</p>
                    <p className="text-sm text-blue-700">
                      Janakpurdham, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/50 p-4 rounded-xl w-full max-w-xs">
                  <div className="p-3 bg-blue-500 rounded-lg shadow-sm">
                    <FontAwesomeIcon 
                      icon={faPhone} 
                      className="text-white text-lg" 
                    />
                  </div>
                  <a
                    href="tel:041-590867"
                    className="hover:text-blue-700 transition-colors text-blue-900"
                  >
                    041-590867/68
                  </a>
                </div>

                <div className="flex items-center space-x-3 bg-white/50 p-4 rounded-xl w-full max-w-xs">
                  <div className="p-3 bg-blue-500 rounded-lg shadow-sm">
                    <FontAwesomeIcon 
                      icon={faEnvelope} 
                      className="text-white text-lg" 
                    />
                  </div>
                  <a
                    href="mailto:mihs@mihs.edu.np"
                    className="hover:text-blue-700 transition-colors text-blue-900"
                  >
                    mihs@mihs.edu.np
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 flex justify-center lg:justify-start space-x-4">
                {[
                  ["facebook", "https://facebook.com", faFacebookF],
                  ["twitter", "https://twitter.com", faTwitter],
                  ["instagram", "https://instagram.com", faInstagram],
                  ["linkedin", "https://linkedin.com", faLinkedinIn],
                ].map(([platform, url, icon]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white hover:bg-blue-500 transition-all shadow-sm hover:shadow-md group"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="text-blue-500 group-hover:text-white text-lg"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-blue-300/50 mt-12 pt-8">
          <p className="text-center text-sm text-blue-700 font-medium">
            &copy; {new Date().getFullYear()} Madhesh Institute of Health Sciences.
            <br className="sm:hidden" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;