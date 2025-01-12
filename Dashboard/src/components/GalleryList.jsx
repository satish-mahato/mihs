import React, { useState, useEffect } from "react";
import axios from "axios";

const GalleryList = () => {
  const [galleryRecords, setGalleryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gallery");
        setGalleryRecords(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-600">
        Gallery
      </h1>
      <div className="space-y-16">
        {galleryRecords.map((record) => (
          <div
            key={record._id}
            className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200"
          >
            {/* Title Section */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-gray-800">
                {record.title}
              </h2>
              <p className="text-lg text-gray-500">
                Date: {new Date(record.date).toLocaleDateString()}
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {record.files.map((file) => (
                <div
                  key={file._id}
                  className="relative group rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={`http://localhost:5000/${file.filePath}`}
                    alt={file.fileName}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">
                      {file.fileName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryList;
