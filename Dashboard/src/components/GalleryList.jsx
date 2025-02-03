import React, { useState, useEffect } from "react";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

const GalleryList = () => {
  const [galleryRecords, setGalleryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("https://auth.sm12.com.np/api/gallery");
        setGalleryRecords(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <PacmanLoader color="#3B82F6" size={25} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="bg-red-100 p-6 rounded-lg max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Visual Memories
            </span>
            <span className="absolute -bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-blue-400 rounded-full animate-pulse"></span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Journey through our collection of captured moments and cherished experiences
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {galleryRecords.map((record) => (
            <section 
              key={record._id} 
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 transition-all hover:shadow-2xl"
            >
              <div className="mb-6 sm:mb-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {record.title}
                </h2>
                <time className="text-sm sm:text-base font-medium text-blue-500 italic">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                {record.files.map((file) => (
                  <div
                    key={file._id}
                    className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl transform transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <img
                      src={`https://auth.sm12.com.np/${file.filePath}`}
                      alt={record.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {galleryRecords.length === 0 && (
          <div className="text-center py-16 sm:py-24">
            <div className="inline-block p-6 bg-white rounded-xl shadow-lg">
              <span className="text-gray-500 text-lg sm:text-xl">✨ No moments captured yet</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryList;