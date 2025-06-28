"use client";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 glass-effect border-b border-gray-100"
    >
      <div className="flex justify-between items-center py-4 px-6 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          src={assets.logo}
          alt="Logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 shadow-lg transition-all duration-300"
          onClick={() => navigate("/admin")}
        >
          {token ? "Dashboard" : "Login"}
          <motion.img
            src={assets.arrow}
            alt="Arrow"
            className="w-3"
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          />
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
