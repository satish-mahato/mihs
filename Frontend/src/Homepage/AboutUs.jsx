import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-1/2 md:pr-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
            About Us
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-7 mb-4">
            The Madhesh Institute of Health Sciences (MIHS) is a leading medical
            institution in Janakpurdham, Madhesh Province, Nepal, dedicated to
            improving healthcare through quality education, research, and
            community engagement.
          </p>
          <a
            href="#" // Replace with the actual URL
            className="inline-block bg-blue-600 text-white px-4 py-2 text-sm sm:text-base rounded hover:bg-blue-700 transition duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="/assets/new.png" // Replace with the actual image path
            alt="Madhesh Institute of Health Sciences"
            className="w-full h-auto rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
