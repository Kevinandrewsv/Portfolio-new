// src/components/Contact.jsx
import React, { useState } from "react";
import EmailLottie from "./EmailLottie";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion";
import "../buttonStyle.css";
import { styles } from "../style";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xqaljeby", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        toast.success("Message Sent Successfully");
        form.reset();
      } else {
        toast.error("Message Send Failed");
      }
    } catch (err) {
      console.error("Form send error:", err);
      toast.error("Message Send Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Heading Section */}
      <motion.section
        id="contact"
        className="w-full py-16 relative overflow-hidden flex justify-center items-center"
        variants={staggerContainer(0.12, 0.04)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <h1
          aria-hidden="true"
          className="absolute inset-0 flex justify-center items-center text-[6rem] font-black text-white opacity-5 select-none pointer-events-none uppercase"
        >
          Contact Me
        </h1>
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="relative z-10 text-center w-full"
        >
          <h2 className={styles.sectionHeadText}>Contact Me</h2>
        </motion.div>
      </motion.section>

      {/* Form & Lottie */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-4 lg:px-20 mt-8">
        {/* Form */}
        <motion.div
          className="w-full lg:w-2/3"
          variants={fadeIn("up", "spring", 0.3, 0.8)}
        >
          <div className="w-full p-8 rounded-lg shadow-2xl backdrop-blur-sm bg-gray-900/50">
            <form
              onSubmit={sendEmail}
              className="space-y-6"
              aria-label="Contact form"
            >
              <div>
                <label className="block mb-2 text-sm text-gray-200">
                  Full Name
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  autoComplete="name"
                  className="w-full px-5 py-3 bg-gray-800 text-gray-200 rounded-md border border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-200">
                  Email Address
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
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
                className="button-85 w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
                role="button"
                aria-busy={isLoading}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    className="block w-6 h-6 mx-auto border-2 border-dashed rounded-full animate-spin"
                    role="status"
                    aria-label="Sending"
                  />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Lottie */}
        <motion.div
          className="w-full lg:w-1/2"
          variants={fadeIn("right", "spring", 0.35, 0.8)}
        >
          <EmailLottie />
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
