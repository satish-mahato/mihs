import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 Number */}
        <div className="animate-pulse">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            404
          </h1>
        </div>

        {/* Space-themed Illustration */}
        <div className="relative mt-12">
          <svg
            className="w-64 h-64 mx-auto transform rotate-12 animate-float"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4F46E5"
              d="M45.1,-59.1C57.7,-53.3,66.2,-37.7,69.4,-21.5C72.6,-5.3,70.5,11.4,64.3,25.5C58.1,39.6,47.8,51.1,35.4,59.1C23,67.1,8.5,71.6,-6.1,69.3C-20.7,67,-34.4,57.8,-45.4,47.1C-56.5,36.4,-64.9,24.2,-67.9,9.9C-70.9,-4.4,-68.6,-20.8,-60.4,-33.5C-52.1,-46.2,-38,-55.2,-23.6,-60.2C-9.2,-65.3,5.5,-66.4,19.1,-63.1C32.7,-59.7,45.2,-51.8,45.1,-59.1Z"
              transform="translate(100 100)"
            />
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 200}
                cy={Math.random() * 200}
                r={Math.random() * 1.5}
                className="fill-white animate-twinkle"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  opacity: Math.random(),
                }}
              />
            ))}
          </svg>
        </div>

        {/* Content */}
        <h2 className="mt-12 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          Oops! Lost in Space?
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          The page you're looking for seems to have vanished into the cosmic
          void.
          <br />
          Don't worry, our team of digital astronauts is on the way to rescue
          you!
        </p>

        {/* Back to Home Button */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Beam Me Home
          </Link>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
          100% {
            transform: translateY(0px) rotate(12deg);
          }
        }
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
