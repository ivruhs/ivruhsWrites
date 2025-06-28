import multer from "multer";

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Initialize multer with memory storage
const upload = multer({ storage });

export default upload;
