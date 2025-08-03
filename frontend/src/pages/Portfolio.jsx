import { useEffect, useState } from "react";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "framer-motion";

const Portfolio = () => {
  const [galleryData, setGalleryData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 15;

  // ✅ Loading state
  const [loading, setLoading] = useState(true);

  // Fetch gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true); // Start loading

        // const res = await axios.get("http://localhost:5000/api/gallery");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/gallery`
        );
        const grouped = groupByCategory(res.data);
        setGalleryData(grouped);

        setSelectedCategory("All");
        setCurrentPage(1);
      } catch (err) {
        console.error("Error fetching gallery data:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchGallery();
  }, []);

  // Group by category

  const groupByCategory = (data) => {
    const grouped = {};
    const allPhotos = [];

    data.forEach((item) => {
      const formatted = {
        src: item.url,
        alt: item.title || "image",
        _id: item._id,
      };

      allPhotos.push(formatted);

      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(formatted);
    });

    // Show latest images first
    allPhotos.reverse();
    for (const category in grouped) {
      grouped[category].reverse();
    }

    grouped["All"] = allPhotos;

    return grouped;
  };

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setOpenLightbox(true);
  };

  const categories = Object.keys(galleryData);

  const paginatedImages = selectedCategory
    ? galleryData[selectedCategory]?.slice(
        (currentPage - 1) * imagesPerPage,
        currentPage * imagesPerPage
      )
    : [];

  const totalPages = selectedCategory
    ? Math.ceil(galleryData[selectedCategory]?.length / imagesPerPage)
    : 0;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Portfolio</h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        categories.length > 0 && (
          <>
            {/* Category Filter */}
            <div className="sticky top-14 z-20 py-1  shadow-md">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-2  rounded-full font-lg transition cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-blue-500 text-white"
                        : "bg-gray-400 hover:bg-gray-300 text-black"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)} (
                    {galleryData[cat]?.length || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Active Category Heading */}
            <h3 className="text-sm font-semibold text-center mb-2 text-gray-700">
              Currently Viewing:{" "}
              <span className="text-blue-600 capitalize">
                {selectedCategory}
              </span>
            </h3>

            {/* Image Gallery */}
            <AnimatePresence mode="wait">
              {selectedCategory && paginatedImages && (
                <motion.div
                  key={selectedCategory + currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4"
                >
                  {paginatedImages.map((img, index) => (
                    <img
                      key={img._id}
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      onClick={() =>
                        handleImageClick(
                          (currentPage - 1) * imagesPerPage + index
                        )
                      }
                      className="w-full mb-4 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 grayscale-0 hover:grayscale-100"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 rounded-full ${
                      currentPage === i + 1
                        ? "bg-gray-200 hover:bg-gray-300"
                        : "bg-black text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {/* Lightbox */}
            {selectedCategory && galleryData[selectedCategory] && (
              <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                index={photoIndex}
                slides={galleryData[selectedCategory]}
              />
            )}
          </>
        )
      )}
    </div>
  );
};

export default Portfolio;
