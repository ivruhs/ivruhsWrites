"use client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { title, description, category, image, _id } = blog;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/blog/${_id}`)}
      className="group bg-white rounded-2xl overflow-hidden shadow-custom hover:shadow-custom-xl transition-all duration-500 cursor-pointer border border-gray-100"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mb-4"
        >
          {category}
        </motion.span>

        <h3 className="font-semibold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        <div
          className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 120) + "...",
          }}
        />

        <motion.div
          className="flex items-center mt-4 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span>Read more</span>
          <motion.span
            className="ml-1"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
