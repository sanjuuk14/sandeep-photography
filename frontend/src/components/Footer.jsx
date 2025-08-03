import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black  text-gray-400 py-2 px-4 ">
      <div className="max-w-6xl mx-auto text-center border-t-1 border-white">
        <p className="mb-4 text-white text-xl font-bold">Sandeep Photography</p>
        <p className="mb-4">
          <a href="tel:+919876543210" className="hover:text-white">
            📞 9756419050
          </a>{" "}
          <a href="tel:+919758589200" className="hover:text-white">
            📞 9758589200
          </a>
          <br />
          📧
          <a
            href="mailto:pradeeppanwar7094@gamail.com"
            className="hover:text-white"
          >
            pradeeppanwar7094@gamail.com
          </a>
        </p>

        <div className="flex justify-center items-center space-x-6 mb-4 text-2xl">
          <a
            href="tel:+919756419050"
            className="hover:text-white transition"
            title="Call"
          >
            <FaPhoneAlt />
          </a>
          <a
            href="mailto:pradeeppanwar7094@gmail.com"
            className="hover:text-white transition"
            title="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://instagram.com/sandeep_photography09"
            target="_blank"
            className="hover:text-white transition"
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            className="hover:text-white transition"
            title="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://wa.me/919756419050"
            target="_blank"
            className="hover:text-white transition"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>

        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()}
          <span className="text-white"> Sandeep Photography</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
