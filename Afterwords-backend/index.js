import express from "express";
import "dotenv/config";
import cors from "cors";
import authorsRoutes from "./routes/author-routes.js";
import lovedeEntriesRoutes from "./routes/loved-ones-routes.js";
import entriesRoutes from "./routes/entries-routes.js";

const app = express();
const PORT = process.env.PORT || 8081;
const BACKEND_URL = process.env.BACKEND_URL;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json()); // attaches body to the req Object

app.use("/authors", authorsRoutes);
app.use("/loved-ones", lovedeEntriesRoutes);
// app.use("/entries", entriesRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Afterwords API. To access author data go to <strong>/authors.</strong> To access loved ones data go to <strong>/loved-ones.</strong>  To access entries data go to <strong>/entries.</strong>"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at ${BACKEND_URL}:${PORT} :)`);
});
