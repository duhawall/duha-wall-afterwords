import express from "express";
import "dotenv/config";
import cors from "cors";
import authorsRoutes from "./routes/author-routes.js";
import lovedOnesRoutes from "./routes/loved-one-routes.js";

const app = express();
const PORT = process.env.PORT || 8081;
const BACKEND_URL = process.env.BACKEND_URL;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json()); // attaches body to the req Object

app.use("/authors", authorsRoutes);
app.use("/loved-ones", lovedOnesRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Afterwords API. To access warehouses data go to <strong>/prim-users.</strong> To access inventories data go to <strong>/loved-ones.</strong>"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at ${BACKEND_URL}:${PORT} :)`);
});
