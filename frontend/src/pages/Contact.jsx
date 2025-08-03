import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [popupMsg, setPopupMsg] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true); // show loader
    setPopupMsg(null); // reset popup

    emailjs
      .sendForm(
        "service_x5mocck",
        "template_02cns56",
        form.current,
        "yj7bb1qzC24mZxPeO"
      )
      .then(
        (result) => {
          // setTimeout(() => setPopupMsg(null), 4000);
          setLoading(false);
          setPopupMsg({
            type: "success",
            message: "Message sent successfully!",
          });
          form.current.reset();
        },
        (error) => {
          // setTimeout(() => setPopupMsg(null), 4000);

          setLoading(false);
          setPopupMsg({ type: "error", message: "Failed to send message." });
          console.error(error.text);
        }
      );
  };
  return (
    <div className="max-w-4xl mx-auto text-white px-4 py-13">
      <h2 className="text-3xl font-bold  text-center "> Contact Us </h2>
      <p className="text-center  mb-5">For Pricing & More</p>
      <div className="grid gap-8 md:grid-cols-2">
        {/* contact form  */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-4 border rounded-xl p-2 border-blue-400 "
        >
          <input
            type="text"
            name="user_name"
            className="w-full bg-gray-800  px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500  animate-[fadeInDown_0.5s_ease-in_forwards]"
            placeholder="Your Name"
            required
          />
          <input
            type="tel"
            name="user_mobile"
            pattern="[0-9]{10}"
            className="w-full bg-gray-800    px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 animate-[fadeInDown_0.6s_ease-in_forwards]"
            placeholder="Your Mobile Number"
            required
          />{" "}
          <input
            type="email"
            name="user_email"
            className="w-full bg-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 animate-[fadeInDown_0.7s_ease-in_forwards]"
            placeholder="Your Email"
          />
          <textarea
            className=" w-full  bg-gray-800 px-4 py-2 rounded h-32 resize-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 animate-[fadeInDown_0.8s_ease-in_forwards]"
            name="message"
            id=""
            placeholder="Type Your Message"
            required
          ></textarea>
          {/* Hidden time field */}
          <input
            type="hidden"
            name="user_time"
            value={new Date().toLocaleString()}
          />
          <button
            type="submit"
            disabled={loading}
            className="border transition duration-500 border-blue-400 cursor-pointer px-6 py-2 rounded hover:bg-blue-400 "
          >
            Send Message
          </button>
          {/* Loading icon  */}
          {loading ? (
            <svg
              className="animate-spin  h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            ""
          )}
          {popupMsg && (
            <div
              className={`mt-4 p-2 rounded text-sm  animate-pulse ${
                popupMsg.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {popupMsg.message}
            </div>
          )}
        </form>
        {/* conatact info */}
        <div className="space-y-4 border rounded-xl p-2 border-blue-400 ">
          <p className="flex items-center gap-2 animate-[fadeInDown_0.5s_ease-in_forwards]">
            <FaPhoneAlt className="text-gray-600 text-xl" />
            <a href="tel:+919756419050" className="hover:underline ">
              +91 9756419050
            </a>
            <a href="tel:+919756419050" className="hover:underline ">
              +91 9758589200
            </a>
          </p>
          <p className="flex items-center gap-2 animate-[fadeInDown_0.6s_ease-in_forwards]">
            <FaEnvelope className="text-gray-600 text-xl" />
            <a href="mailto:your@email.com" className="hover:underline">
              pradeeppanwar7094@gmail.com
            </a>
          </p>

          <div className="flex gap-4 mt-4 animate-[fadeInDown_0.7s_ease-in_forwards]">
            <a
              href="https://wa.me/919756419050"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              <FaWhatsapp className="text-green-600 text-3xl hover:animate-spin hover:brightness-500" />
            </a>
            <a
              href="https://instagram.com/sandeep_photography09"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {" "}
              <FaFacebook className="text-blue-400 text-3xl hover:animate-spin hover:brightness-500" />
            </a>
            <a
              href="https://instagram.com/sandeep_photography09"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              <FaInstagram className="text-pink-500 text-3xl hover:animate-spin hover:brightness-500" />
            </a>
          </div>
        </div>

        {/* Location added */}
        <div className="mt-1 ">
          <h3 className="text-xl font-semibold mb-2">Our Studio Location</h3>
          <div className="w-full border border-blue-400 rounded-xl  h-64 md:h-96 overflow-hidden shadow">
            Not Available
            <iframe
              title="Studio Location"
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d430.4418730073728!2d78.51094597728599!3d30.335742199135474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909030498d5c3c5%3A0xc9d6e2ba81ebd873!2s8GP6%2B79P%2C%20Jakhnidhar%2C%20Uttarakhand%20249123!5e0!3m2!1sen!2sin!4v1753688161600!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
