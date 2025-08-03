import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative  h-[70vh] md:h-[90vh]  w-full  overflow-hidden pt-14">
      {/* background image */}
      <img
        src="/images/hero.jpg
        "
        alt="hero background"
        className="w-full h-full object-cover  brightness-[0.4] "
      />

      {/* overlay text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 ">
        <h1
          style={{ fontFamily: "Lavishly Yours" }}
          className="flex text-4xl md:text-7xl "
        >
          Sandeep Photography
          <img src="/images/heart.png" className="animate-pulse w-10 " alt="" />
        </h1>

        <p className="text-lg  md:py-5 md:text-xl font-thin ">
          Capturing moments, one frame at a time.
        </p>

        <Link
          to="/portfolio"
          className="mt-1 px-6 py-1  hover:text-blue-400 cursor-pointer border rounded-full"
        >
          View Portfolio
        </Link>
      </div>
    </div>
  );
};

export default Hero;
