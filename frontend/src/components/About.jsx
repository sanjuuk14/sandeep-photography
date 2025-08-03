import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-black text-white py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Hi, I’m a passionate wedding and portrait{" "}
          <span className="text-blue-400 font-semibold">photographer</span>. I
          specialize in capturing timeless moments with a creative touch —
          telling your story through vibrant frames and authentic emotions.
        </p>
        <Link
          to="/about"
          className="inline-block mt-6 px-6 py-3 border border-blue-400 text-white rounded-full hover:bg-blue-500 transition"
        >
          Read More
        </Link>
      </div>
    </section>
  );
};

export default About;
