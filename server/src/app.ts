import express from "express";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import multer from "multer";
import path from "path";
import cors from "cors";

const app = express();

// Configure multer storage to preserve file extensions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);

// Upload endpoint
app.post("/api/upload", upload.single("coverImage"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ imageUrl: `/uploads/${file.filename}` });
});

export default app;
