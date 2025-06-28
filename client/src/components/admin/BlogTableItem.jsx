"use client";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post(`/api/blog/delete`, { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Error deleting blog"
      );
    }
  };

  const togglePublishStatus = async () => {
    try {
      const { data } = await axios.post(`/api/blog/toggle-publish`, {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error toggling publish status"
      );
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-6 py-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-600">{index}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900 line-clamp-2">{title}</div>
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        <span className="text-sm text-gray-600">
          {BlogDate.toLocaleDateString()}
        </span>
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
            blog.isPublished
              ? "bg-green-100 text-green-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {blog.isPublished ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePublishStatus}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              blog.isPublished
                ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={deleteBlog}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
          >
            {/* <img
              src={assets.cross_icon || "/placeholder.svg"}
              alt=""
              className="w-4 h-4"
            /> */}
            <Trash className="w-4 h-4" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

export default BlogTableItem;
