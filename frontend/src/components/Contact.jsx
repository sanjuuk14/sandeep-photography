import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
    <section className="bg-black  py-5 px-4  text-white " id="contact">
      <div className="max-w-xl mx-auto text-center border-1 border-blue-400 rounded-2xl p-2 md:p-5  ">
        <h2 className="text-3xl md:text-4xl font-bold mb-6"> Lets! Connect</h2>
        <p className="text-gray-300 mb-8">
          Have a project or event in mind? Fill out the form below and I’ll get
          back to you soon.
        </p>

        {/* Form  */}
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="tell"
              name="user_mobile"
              pattern="[0-9]{10}"
              placeholder="Your Mobile"
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              name="message"
              id=""
              rows="5"
              placeholder="Type Your Message"
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="border border-blue-400 cursor-pointer hover:bg-blue-500 transition px-6 py-3 rounded-full text-white"
          >
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
              "Send Message"
            )}
          </button>

          {/* popup message  */}
          {popupMsg && (
            <div
              className={`p-2 rounded text-sm  animate-pulse ${
                popupMsg.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {popupMsg.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
