import express from "express";
import fs from "fs"; // file system module
import * as lovedOnesController from "../controllers/loved-entries-controllers.js";
const router = express.Router();

router.route("/");

router.route("/add-new").post(lovedOnesController.addLovedOne); // add new author

// router
//   .route("/:id")
//   .get(lovedOnesController.findLovedOne) // get lovedOne data
//   .put(lovedOnesController.editLovedOne) // update lovedOne data
//   .delete(lovedOnesController.deleteLovedOne); // delete lovedOne

// // get entries data
// router.get("/loved-one/entries", (req, res) => {
//   const entriesData = fs.readFileSync("./data/entries.json", "utf8");
//   res.send(entriesData);
// });

// router.post("/:id/loved-one/:id", (req, res) => {
//   const lovedOne = fs.readFileSync("./data/entries.json", "utf8");
//   const parsedLovedOne = JSON.parse(lovedOnesData);
//   const foundLovedOne = (lovedOne) => {
//     return lovedOne.id === req.params.id;
//   };
//   res.send(foundLovedOne);
// });

export default router;
