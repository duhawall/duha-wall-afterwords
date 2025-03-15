import express from "express";
import fs from "fs"; // file system module
const router = express.Router();

// get entries data
router.get("/loved-one/entries", (req, res) => {
  const entriesData = fs.readFileSync("./data/entries.json", "utf8");
  res.send(entriesData);
});

router.post("/user/loved-one/:id", (req, res) => {
  const lovedOne = fs.readFileSync("./data/entries.json", "utf8");
  const parsedLovedOne = JSON.parse(lovedOnesData);
  const foundLovedOne = (lovedOne) => {
    return lovedOne.id === req.params.id;
  };
  res.send(foundLovedOne);
});

export default router;

// 280be87a-837a-4d92-8800-6fe51f596ef6
