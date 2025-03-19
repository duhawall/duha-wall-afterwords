import express from "express";
import * as entriesController from "../controllers/entries-controllers.js";
const router = express.Router();

// router.route("/");

router.route("/:id/:lovedOneId/entry/add-new").post(entriesController.addEntry); // add new entry

router
  .route("/:id/:lovedOneId/entries")
  .get(entriesController.getLovedOneEntries); // get all entries for a loved one

router
  .route("/:id/:lovedOneId/entry/:entryId")
  .get(entriesController.getEntry) // get an entry
  .put(entriesController.putEntry) // update an entry
  .delete(entriesController.deleteEntry); // delete an entry

export default router;
