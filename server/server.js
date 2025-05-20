import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { readdirSync } from "fs";
import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error", err));

app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

// Load all routes
const loadRoutes = async () => {
  const routeFiles = readdirSync(path.join(__dirname, "routes"));
  for (const file of routeFiles) {
    const routeModule = await import(`./routes/${file}`);
    app.use("/api", routeModule.default);
  }
};

await loadRoutes();

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
