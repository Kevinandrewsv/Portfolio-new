import React, { useRef } from "react";
import EmailLottie from "./EmailLottie";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import StarWrapper from "../hoc/SectionWrapper";
import "../buttonStyle.css";
import emailjs from "@emailjs/browser";
import { styles } from "../style";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    setIsLoading(true);
    e.preventDefault();
    emailjs
      .sendForm(
        "service_fcdrz7b",
        "template_uyx0zmf",
        form.current,
        "nQ59IwStphiSqwLAD"
      )
      .then(
        (result) => {
          toast.success("Message Sent Successfully");
          setIsLoading(false);
          form.current.reset();
        },
        (error) => {
          toast.error("Message Sent Failed");
          setIsLoading(false);
        }
      );
  };

  return (
    <>
      {/* Contact banner matching “About Me” style */}
      <section
        id="contact"
        className="w-full py-16 relative overflow-hidden flex justify-center items-center"
      >
        {/* Giant translucent background text */}
        <h1 className="absolute inset-0 flex justify-center items-center text-[6rem] font-black text-white opacity-5 select-none pointer-events-none uppercase">
          Contact Me
        </h1>

        {/* Foreground animated heading */}
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="relative z-10 text-center"
        >
          <h2 className={styles.sectionHeadText}>Contact Me</h2>
        </motion.div>
      </section>

      {/* Contact form & animation */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-4 lg:px-20 mt-8">
        <div className="w-full lg:w-2/3">
          <motion.div variants={fadeIn("up", "spring", 0.5, 0.75)}>
            <div className="w-full p-8 rounded-lg shadow-2xl backdrop-blur-sm bg-gray-900/50">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm text-gray-200">
                    Full Name
                  </label>
                  <input
                    required
                    name="from_name"
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-5 py-3 bg-gray-800 text-gray-200 rounded-md border border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-200">
                    Email Address
                  </label>
                  <input
                    required
                    name="from_email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-5 py-3 bg-gray-800 text-gray-200 rounded-md border border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-200">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Your message..."
                    className="w-full px-5 py-3 bg-gray-800 text-gray-200 rounded-md border border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  className="button-85 w-full text-center"
                  role="button"
                >
                  {isLoading ? (
                    <span className="block w-6 h-6 mx-auto border-2 border-dashed rounded-full animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <EmailLottie />
        </div>
      </div>
    </>
  );
};

export default StarWrapper(Contact, "contact");
