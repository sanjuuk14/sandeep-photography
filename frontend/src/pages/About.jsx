// src/pages/About.jsx
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="bg-black pt-15 p-6 flex flex-col items-center justify-center text-center ">
      <h2 className="text-white text-3xl font-bold mb-4">About Us</h2>
      <p className="max-w-2xl text-gray-400 leading-relaxed">
        Hi, I'm a passionate photographer with a love for capturing timeless
        moments and genuine emotions. Whether it's a grand wedding, a cozy
        family portrait, or breathtaking drone views, I strive to tell unique
        stories through my lens. With every click, I aim to preserve memories
        that last forever.
      </p>

      <div className="mt-8">
        <Link to="/admin-login" className="cursor-none">
          <img
            src="/images/about-me.jpg"
            alt="Sanju Photographer"
            className="w-64 h-64 object-cover rounded-full border-5 border-blue-400 shadow-lg mx-auto  animate-[fadeInDown_0.8s_ease-out_forwards]"
          />
        </Link>
      </div>
    </div>
  );
};

export default About;
