import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Portfolio = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/gallery");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/gallery`
        );

        // Sort and slice to get latest 6 images
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const sliced = sorted.slice(0, 8);

        setImages(sliced);
      } catch (err) {
        console.error("Error loading homepage gallery:", err);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="bg-black text-white  px-4" id="portfolio">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Featured Work
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-lg group">
            <img
              src={img.url}
              alt={img.title || `Gallery Image ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-110 duration-500"
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/portfolio"
          className="inline-block px-6 py-3 border border-blue-400 rounded-full hover:bg-blue-500 transition duration-300"
        >
          View Full Portfolio
        </Link>
      </div>
    </section>
  );
};

export default Portfolio;
