"use client";

import React from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error fetching blog data"
      );
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error fetching comments"
      );
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!name || !content) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await axios.post(`/api/blog/add-comment`, {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        setName("");
        setContent("");
        toast.success("Comment added for review");
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error adding comment"
      );
    }
  };

  React.useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src={assets.gradientBackground || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative px-6 sm:px-8 lg:px-12 xl:px-16 max-w-4xl mx-auto py-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-blue-600 font-medium mb-4"
            >
              Published on {Moment(data.createdAt).format("MMMM Do, YYYY")}
            </motion.p>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {data.title}
            </motion.h1>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {data.subTitle}
            </motion.h2>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-custom border border-gray-100"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                SH
              </div>
              <span className="text-gray-700 font-medium">IvRuHs</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 sm:px-8 lg:px-12 xl:px-16 max-w-4xl mx-auto py-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <img
            src={data.image || "/placeholder.svg"}
            alt={data.title}
            className="w-full rounded-3xl shadow-custom-lg"
          />
        </motion.div>

        <motion.article
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rich-text prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* Comments Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Comments ({comments.length})
          </h3>

          <div className="space-y-6">
            {comments
              .filter((item) => item && item.name && item.content)
              .map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-custom transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <img
                        src={assets.user_icon || "/placeholder.svg"}
                        alt=""
                        className="w-5 h-5"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {Moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Add Comment Form */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-custom"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Add your comment
          </h3>
          <form onSubmit={addComment} className="space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full px-6 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-6 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none transition-all duration-300"
                required
                placeholder="Write your comment..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
            >
              Submit Comment
            </motion.button>
          </form>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Share this article
          </h3>
          <div className="flex justify-center gap-4">
            {[
              assets.facebook_icon,
              assets.twitter_icon,
              assets.googleplus_icon,
            ].map((icon, index) => (
              <motion.img
                key={index}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                src={icon}
                className="w-12 h-12 cursor-pointer hover:opacity-80 transition-all duration-300"
                alt=""
              />
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
