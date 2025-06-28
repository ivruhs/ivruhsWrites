"use client";

import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = React.useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="relative px-6 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
      <div className="text-center pt-16 pb-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center justify-center gap-3 px-4 py-2 mb-8 border border-blue-200 bg-blue-50 rounded-full text-sm text-blue-600 font-medium"
        >
          <span>✨ New: AI feature integrated</span>
          <motion.img
            src={assets.star_icon}
            alt=""
            className="w-3"
            animate={{ rotate: [0, 360] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "linear",
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-6"
        >
          Your own <span className="gradient-text">blogging</span>
          <br />
          platform.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </motion.p>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onSubmit={onSubmitHandler}
          className="flex max-w-lg mx-auto bg-white rounded-2xl shadow-custom-lg border border-gray-100 overflow-hidden hover:shadow-custom-xl transition-all duration-300"
        >
          <input
            ref={inputRef}
            className="flex-1 px-6 py-4 outline-none text-gray-700 placeholder-gray-400"
            type="text"
            placeholder="Search for blogs..."
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 font-medium transition-all duration-300"
          >
            Search
          </motion.button>
        </motion.form>
      </div>

      {input && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full transition-all duration-300"
          >
            <span>Clear Search</span>
            <span className="text-xs">✕</span>
          </motion.button>
        </motion.div>
      )}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          src={assets.gradientBackground}
          alt="Gradient Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
