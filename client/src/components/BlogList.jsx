"use client";

import { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }
    return blogs.filter((blog) =>
      blog.title
        .toLowerCase()
        .includes(
          input.toLowerCase() ||
            blog.category.toLowerCase().includes(input.toLowerCase())
        )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="px-6 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
      {/* Category Filter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 sm:gap-4 my-12 relative"
      >
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenu(item)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 relative z-10 ${
                menu === item
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="activeCategory"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full -z-10"
                />
              )}
            </motion.button>
          </div>
        ))}
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24"
      >
        <AnimatePresence>
          {filteredBlogs()
            .filter((blog) => (menu === "All" ? true : blog.category === menu))
            .map((blog) => (
              <motion.div
                key={blog._id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredBlogs().filter((blog) =>
        menu === "All" ? true : blog.category === menu
      ).length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No blogs found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;
