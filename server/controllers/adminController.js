import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching blogs",
      error: error.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching comments",
      error: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      dashboardData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching dashboard data",
      error: error.message,
    });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the comment",
      error: error.message,
    });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findByIdAndUpdate(id, { isApproved: true });
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comment approved successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while approving the comment",
      error: error.message,
    });
  }
};
