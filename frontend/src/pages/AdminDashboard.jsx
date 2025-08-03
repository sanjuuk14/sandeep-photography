// ...imports unchanged
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";

const AdminDashboard = () => {
  // States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    url: "",
    thumbnail: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch gallery
  const fetchGallery = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/gallery");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery`
      );

      setGallery(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image file");
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user?.token) {
        alert("Unauthorized. Please login again.");
        setLoading(false);
        return;
      }

      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      uploadData.append("upload_preset", "my_preset");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dntrgwpvr/image/upload",
        uploadData
      );
      const { secure_url, public_id } = cloudinaryRes.data;

      const newItem = {
        ...formData,
        url: secure_url,
        thumbnail: secure_url,
        public_id,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      // await axios.post("http://localhost:5000/api/gallery", newItem, config);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery`,
        newItem,
        config
      );

      setFormData({ title: "", category: "", type: "", thumbnail: "" });
      setImageFile(null);
      setPreviewUrl(null);
      fetchGallery();
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user?.token) {
        alert("Not authorized. Please login again.");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      // await axios.delete(`http://localhost:5000/api/gallery/${id}`, config);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`,
        config
      );

      fetchGallery();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    } finally {
      setDeletingId(null);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin-login");
  };

  const categories = ["all", ...new Set(gallery.map((item) => item.category))];
  const filteredGallery =
    selectedCategory === "all"
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredGallery.slice(startIdx, startIdx + itemsPerPage);

  const slides = filteredGallery.map((item) => ({ src: item.url }));

  return (
    <div className="p-4 max-w-6xl mx-auto mt-10 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Gallery Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="type"
            placeholder="Type (image/video)"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
        </div>
        {previewUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="h-40 object-fill rounded border"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add to Gallery"}
        </button>
      </form>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)} (
            {
              gallery.filter((item) =>
                cat === "all" ? true : item.category === cat
              ).length
            }
            )
          </button>
        ))}
      </div>

      {/* Gallery Display */}
      <div className="columns-2 sm:columns-3 md:columns-5 gap-4 space-y-4">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="relative rounded overflow-hidden hover:scale-105 transform transition duration-300 group"
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full object-cover rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:grayscale"
              onClick={() => {
                const index = filteredGallery.findIndex(
                  (g) => g._id === item._id
                );
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            />
            <div className="bg-black bg-opacity-60 p-2 text-white text-sm">
              <h3 className="font-semibold">{item.title}</h3>
              <p>{item.category}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                disabled={deletingId === item._id}
              >
                {deletingId === item._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {/* <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span> */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded-full ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </div>
  );
};

export default AdminDashboard;
