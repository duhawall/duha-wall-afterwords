import express from "express";
import "dotenv/config";
import cors from "cors";
import authorsRoutes from "./routes/author-routes.js";
import lovedOnesRoutes from "./routes/loved-one-routes.js";

const app = express();
const { CORS_ORIGIN, PORT } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json()); // attaches body to the req Object

// app.use("/authors", authorsRoutes);
// app.use("/loved-ones", lovedOnesRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Afterwords API. To access warehouses data go to <strong>/prim-users.</strong> To access inventories data go to <strong>/loved-ones.</strong>"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} :)`);
});
