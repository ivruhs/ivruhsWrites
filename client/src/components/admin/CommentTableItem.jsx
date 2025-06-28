"use client";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post(`/api/admin/approve-comment`, {
        id: _id,
      });
      if (data.success) {
        fetchComments();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error approving comment"
      );
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post(`/api/admin/delete-comment`, {
        id: _id,
      });
      if (data.success) {
        fetchComments();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error deleting comment"
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
      <td className="px-6 py-6">
        <div className="space-y-3">
          <div>
            <span className="text-sm font-semibold text-gray-900">Blog:</span>
            <p className="text-gray-700 mt-1">{blog.title}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">Name:</span>
            <p className="text-gray-700 mt-1">{comment.name}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">
              Comment:
            </span>
            <p className="text-gray-700 mt-1 leading-relaxed">
              {comment.content}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-6 max-sm:hidden">
        <span className="text-sm text-gray-600">
          {BlogDate.toLocaleDateString()}
        </span>
      </td>
      <td className="px-6 py-6">
        <div className="flex items-center gap-3">
          {!comment.isApproved ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={approveComment}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-all duration-300"
              title="Approve comment"
            >
              <img
                src={assets.tick_icon || "/placeholder.svg"}
                className="w-5 h-5"
                alt="Approve"
              />
            </motion.button>
          ) : (
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Approved
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={deleteComment}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
            title="Delete comment"
          >
            <img
              src={assets.bin_icon || "/placeholder.svg"}
              className="w-5 h-5"
              alt="Delete"
            />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

export default CommentTableItem;
