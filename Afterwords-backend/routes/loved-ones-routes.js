import express from "express";
import * as lovedOnesController from "../controllers/loved-ones-controllers.js";
const router = express.Router();

// router.route("/:id").get(lovedOnesController.getLovedOne); // get a loved one data
//   .put(lovedOnesController.putLovedOne) // update a loved one data
//   .delete(lovedOnesController.deleteLovedOne); // delete a loved one

router.route("/:id/add-new").post(lovedOnesController.postLovedOne); // add new author

router.route("/:id/all").get(lovedOnesController.getLovedOnesForAuthor); // get all loved ones data

router
  .route("/:id/loved-ones/:lovedOneId")
  .get(lovedOnesController.getLovedOne); // get user data

export default router;
