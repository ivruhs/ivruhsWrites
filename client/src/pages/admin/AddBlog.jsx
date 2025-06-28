"use client";

import React from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";
import { motion } from "framer-motion";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const editorRef = React.useRef(null);
  const quillRef = React.useRef(null);

  const [image, setImage] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [subTitle, setSubTitle] = React.useState("");
  const [category, setCategory] = React.useState("Startup");
  const [isPublished, setIsPublished] = React.useState(false);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title first");
    if (!subTitle) return toast.error("Please enter a subtitle first");
    try {
      setLoading(true);
      const prompt = `Write a well-structured, detailed blog post of about 500–600 words.

      Title: "${title}"
      Subtitle: "${subTitle}"
      
      Make it engaging and suitable for a general audience. Use headings and short paragraphs. Do not stop abruptly; ensure the blog ends with a proper conclusion.`;

      const { data } = await axios.post("/api/blog/generate", { prompt });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error generating content"
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      if (!image) {
        toast.error("Please upload an image");
        setIsAdding(false);
        return;
      }
      if (!title || !subTitle || !category) {
        toast.error("Please fill in all fields");
        setIsAdding(false);
        return;
      }
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);
      const { data } = await axios.post("/api/blog/add", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Error adding blog"
      );
    } finally {
      setIsAdding(false);
    }
  };

  React.useEffect(() => {
    //initialize Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Blog</h1>
        <p className="text-gray-600">Create and publish a new blog post</p>
      </motion.div>

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={onSubmitHandler}
        className="bg-white rounded-3xl shadow-custom border border-gray-100 p-8 max-w-4xl"
      >
        {/* Image Upload */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Upload Thumbnail
          </label>
          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            htmlFor="image"
            className="block cursor-pointer"
          >
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
              {!image ? (
                <div>
                  <img
                    src={assets.upload_area || "/placeholder.svg"}
                    alt=""
                    className="w-16 h-16 mx-auto mb-4 opacity-60"
                  />
                  <p className="text-gray-600 font-medium">
                    Click to upload thumbnail
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-xl shadow-custom"
                />
              )}
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
              accept="image/*"
            />
          </motion.label>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter an engaging title..."
            required
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            placeholder="Brief description or subtitle..."
            required
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
          />
        </div>

        {/* Content Editor */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Blog Content
          </label>
          <div className="relative border border-gray-200 rounded-2xl overflow-hidden">
            <div ref={editorRef} className="min-h-[300px]" />
            {loading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-600 font-medium">
                    Generating content...
                  </span>
                </div>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="button"
              onClick={generateContent}
              className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-medium rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              ✨ Generate with AI
            </motion.button>
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            value={category}
          >
            {blogCategories.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 mb-8">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="publish"
            className="text-sm font-medium text-gray-900 cursor-pointer"
          >
            Publish immediately
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          disabled={isAdding}
          type="submit"
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding Blog...
            </div>
          ) : (
            "Add Blog Post"
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddBlog;
