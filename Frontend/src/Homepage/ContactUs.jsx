import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6 flex justify-center items-center">
      <motion.div 
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8 w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Contact Us</h1>
        
        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Location</h2>
            <motion.div 
              className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 text-2xl" />
              <p className="text-gray-700">
                Madhesh Institute of Health Sciences<br />
                Janakpurdham, Madhesh Province, Nepal
              </p>
            </motion.div>
            
            <h2 className="text-2xl font-semibold text-blue-700 mt-8 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <FontAwesomeIcon icon={faPhone} className="text-blue-500 text-2xl" />
                <p className="text-gray-700">041-590867 / 041-590868</p>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 text-2xl" />
                <p className="text-gray-700">mihs@mihs.edu.np</p>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <FontAwesomeIcon icon={faGlobe} className="text-blue-500 text-2xl" />
                <a href="https://mihs.edu.np" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  https://mihs.edu.np
                </a>
              </motion.div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <motion.div 
            className="w-full h-64 md:h-auto rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <iframe
              title="MIHS Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.104037708964!2d85.9151547150636!3d26.75657418316093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3fea128f9567%3A0xa8e30aa024ee3d8d!2sMadhesh%20Institute%20of%20Health%20Sciences%20(%E0%A4%AE%E0%A4%A7%E0%A5%87%E0%A4%B6%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A5%8D%E0%A4%AF%20%E0%A4%B5%E0%A4%BF%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A4%BF%E0%A4%B7%E0%A5%8D%E0%A4%A0%E0%A4%BE%E0%A4%A8)!5e0!3m2!1sen!2snp!4v1698765432107!5m2!1sen!2snp"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;