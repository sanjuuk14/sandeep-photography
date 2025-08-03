import { Link } from "react-router-dom";

const services = [
  {
    title: "Wedding Photography",
    desc: "Capturing every beautiful moment of your special day with elegance and emotion.",
    image: "/Services/wedding.jpg",
  },
  {
    title: "Pre-wedding Shoots",
    desc: "Stylized and cinematic pre-wedding stories tailored to your personality.",
    image: "/Services/prewedding.jpg",
  },
  {
    title: "Event Coverage",
    desc: "From birthdays to corporate events — professionally covered with a keen eye.",
    image: "/Services/event.jpg",
  },

  {
    title: "Baby or Family Portraits",
    desc: "Timeless portraits that capture the love, laughter, and little moments that matter most.",
    image: "/Services/family.jpg",
  },
  {
    title: "Drone Coverage",
    desc: "Stunning aerial shots and cinematic flyovers, drone coverage adds a breathtaking perspective to your special day or event. ",
    image: "/Services/drone.jpg",
  },
];

const Services = () => {
  return (
    <section className="bg-black text-white py-10 px-4 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Services I Offer
        </h2>

        <div className="grid  md:grid-cols-3 lg:grid-cols-4  gap-5">
          {services.map((service, index) => (
            <Link key={index} to={`/services/${service.title}`}>
              <div
                key={index}
                className="p-4 bg-gray-900 rounded-xl shadow-lg hover:shadow-blue-500/40 transition"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-blue-400">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center mt-5">
        <Link
          className="inline-block px-6 py-3 border border-blue-400 rounded-full hover:bg-blue-500 transition duration-300 "
          to="/services"
        >
          Expore More
        </Link>
      </div>
    </section>
  );
};

export default Services;
