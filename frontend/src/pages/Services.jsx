import { Link } from "react-router-dom";
import services from "../data/services";

const Services = () => {
  return (
    <section className="bg-black text-white py-16 px-4 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Services</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2  ">
          {services.map((service, index) => (
            <Link key={index} to={`/services/${service.title}`}>
              <div
                key={index}
                className="p-2 bg-gray-900 rounded-xl shadow-lg hover:shadow-blue-500/40  overflow-hidden hover:scale-[1.02] transition duration-300 "
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-md mb-4  animate-[fadeInDown_0.8s_ease-out_forwards]"
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
    </section>
  );
};

export default Services;
