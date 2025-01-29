import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6">
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4 relative z-10">
              About Us
            </h2>
            <div className="absolute bottom-0 left-0 w-3/4 h-3 bg-blue-200 opacity-80 z-0"></div>
          </div>
          
          <p className="text-base md:text-lg text-gray-700 leading-relaxed md:leading-loose">
            The Madhesh Institute of Health Sciences (MIHS) is a leading medical
            institution in Janakpurdham, Madhesh Province, Nepal, dedicated to
            improving healthcare through quality education, research, and
            community engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-700 text-base font-medium rounded-md text-blue-700 bg-transparent hover:bg-blue-50 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <img
              src="/assets/new.png"
              alt="Madhesh Institute of Health Sciences"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
          <div className="hidden md:block absolute -bottom-6 -left-6 w-16 h-16 bg-blue-300 rounded-full opacity-40"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;