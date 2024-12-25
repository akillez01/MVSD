import multer from "multer";

const storage = multer.memoryStorage();

const uploadFile = multer({ storage }).single("file");

const uploadMiddleware = (req, res, next) => {
  uploadFile(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: "Error uploading file", error: err.message });
    }
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    next();
  });
};

export default uploadMiddleware;