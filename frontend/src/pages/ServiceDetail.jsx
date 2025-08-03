import { useParams, Link } from "react-router-dom";
import services from "../data/services";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.title === serviceId);

  if (!service)
    return (
      <div className="text-center text-red-500 mt-10">Service not found</div>
    );

  return (
    <div className=" px-4 py-15 mt-5 bg-black text-white">
      <div className="max-w-6xl mx-auto ">
        {/* Back Button */}
        <Link
          to="/services"
          className="inline-block  mb-6 border rounded-xl p-1  hover:border-blue-400"
        >
          ← Back to Services
        </Link>

        {/* Card */}
        <div className="bg-gray-900   shadow-xl rounded-2xl overflow-hidden md:flex transition duration-300 hover:shadow-2xl">
          <div className="md:w-1/2">
            <img
              src={service.image}
              alt={service.title}
              className="object-cover w-full h-64 md:h-full  animate-[fadeInDown_0.8s_ease-out_forwards]"
            />
          </div>
          <div className="p-6 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 ">{service.title}</h2>
            <p className=" text-lg leading-relaxed text-gray-400">
              {service.fullDescription}
            </p>

            {/* Optional: Add some service features if available */}
            <ul className="mt-4 list-disc list-inside  text-gray-400">
              <li>High-resolution photos</li>
              <li>Professional editing</li>
              <li>Flexible packages</li>
            </ul>
            <Link
              to="/contact"
              className="  m-auto mt-2 border w-30 rounded-xl p-1  hover:bg-blue-500"
            >
              ← Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
