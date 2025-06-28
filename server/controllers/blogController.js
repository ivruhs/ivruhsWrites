import main from "../configs/gemini.js";
import imageKit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    if (!title || !description || !category || !isPublished || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Read file buffer directly (from memory)
    const fileBuffer = imageFile.buffer;

    // ✅ Upload the image to ImageKit
    const response = await imageKit.upload({
      file: fileBuffer, // required
      fileName: imageFile.originalname, // required
      folder: "/blog-images", // optional
    });

    // ✅ Optimize the image URL
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res
      .status(201)
      .json({ success: true, message: "Blog added successfully", blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the blog",
      error: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching blogs",
      error: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the blog",
      error: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findByIdAndDelete(id);

    // delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the blog",
      error: error.message,
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(200).json({
      success: true,
      message: `Blog ${
        blog.isPublished ? "published" : "unpublished"
      } successfully`,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while toggling publish status",
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    if (!blog || !name || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newComment = await Comment.create({
      blog,
      name,
      content,
      isApproved: false, // assuming moderation is required
    });

    res.status(201).json({
      success: true,
      message: "Comment added for review",
      comment: newComment, // 🔥 return the saved comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the comment",
      error: error.message,
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching comments",
      error: error.message,
    });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required and must be a string",
      });
    }

    console.log("📥 Generating blog with prompt:", prompt); // Debug log

    const content = await main(prompt);

    console.log("✅ Blog content generated");

    res.status(200).json({
      success: true,
      message: "Content generated successfully",
      content,
    });
  } catch (error) {
    console.error("🔥 Error in generateContent:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating content",
      error: error.message,
    });
  }
};
