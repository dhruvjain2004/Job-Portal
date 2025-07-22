import multer from "multer";

// Configure multer to use memory storage instead of disk storage
// This will store the file in memory as a buffer, which is needed for Cloudinary upload
const storage = multer.memoryStorage();

const upload = multer({storage});

export default upload;