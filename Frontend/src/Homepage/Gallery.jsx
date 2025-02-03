import React, { useState, useEffect } from "react";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

const Gallery = () => {
  const [galleryRecords, setGalleryRecords] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("https://auth.sm12.com.np/api/gallery");
        const records = response.data.data;
        setGalleryRecords(records);
        
        const images = records.flatMap(record => 
          record.files.map(file => ({
            url: file.filePath,
            title: record.title,
            id: file._id
          }))
        );
        setAllImages(images);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleImageClick = (file, recordTitle) => {
    const index = allImages.findIndex(img => img.id === file._id);
    setCurrentIndex(index);
    setSelectedImage(allImages[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStart;

    if (delta > 50) {
      goToPrevious();
    } else if (delta < -50) {
      goToNext();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (selectedImage) document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <PacmanLoader color="#3B82F6" size={25} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="bg-red-100 p-6 rounded-lg max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-red-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
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
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-4"
          onClick={closeModal}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div 
              className="relative max-w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <button
                onClick={closeModal}
                className="absolute -top-10 right-0 sm:right-2 text-white hover:text-gray-300 z-50"
              >
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 transform p-2 sm:p-4 text-white hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform p-2 sm:p-4 text-white hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <img
                src={`https://auth.sm12.com.np/${selectedImage.url}`}
                alt={selectedImage.title}
                className="max-h-[80vh] w-full object-contain"
              />
              {selectedImage.title && (
                <div className="text-center mt-2 sm:mt-4 text-white text-sm sm:text-lg">
                  {selectedImage.title}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Visual Memories
            </span>
            <span className="absolute -bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-blue-400 rounded-full animate-pulse"></span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Journey through our collection of captured moments and cherished
            experiences
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
                  {new Date(record.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                {record.files.map((file) => (
                  <div
                    key={file._id}
                    onClick={() => handleImageClick(file, record.title)}
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
              <span className="text-gray-500 text-lg sm:text-xl">
                ✨ No moments captured yet
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;