"use client";
import { assets, footer_data } from "../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="px-6 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 py-16 border-b border-gray-200">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:max-w-md"
          >
            <img
              src={assets.logo || "/placeholder.svg"}
              alt="logo"
              className="w-40 mb-6"
            />
            <p className="text-gray-600 leading-relaxed">
              Your premier destination for insightful articles, cutting-edge
              technology discussions, and thought-provoking content that
              inspires and informs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            {footer_data.map((section, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm"
                        whileHover={{ x: 4 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Copyright 2025 © IvRuHs - All Rights Reserved. Made with ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
