import express from "express";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import multer from "multer";
import path from "path";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);

export default app;
