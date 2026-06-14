import multer from "multer";

const upload = multer({
    storage:multer.memoryStorage(),
    limits : {
        fileSize: 10*1024*1024 //3MB FILE
    },
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype.startsWith("application/pdf")) {
    //         cb(null, true); // Accept the file
    //     } else {
    //         cb(new Error("Only PDF files are allowed")); // Reject the file
    //     }
    // }
});

const uploadMiddleware = upload.single("resume");

export default uploadMiddleware;