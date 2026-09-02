import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

app.use("/api/todos", todoRoutes);

const clientDist = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDist));

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    });
}

export default app;
