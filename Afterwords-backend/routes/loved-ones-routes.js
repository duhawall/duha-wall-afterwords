import express from "express";
import * as lovedOnesController from "../controllers/loved-ones-controllers.js";
const router = express.Router();

router.route("/:id/add-new").post(lovedOnesController.postLovedOne); // add new loved one

router.route("/:id/all").get(lovedOnesController.getLovedOnesForAuthor); // get all loved ones data

router
  .route("/:id/loved-one/:lovedOneId")
  .get(lovedOnesController.getLovedOne) // get a loved one
  .put(lovedOnesController.putLovedOne) // update a loved one
  .delete(lovedOnesController.deleteLovedOne); // delete a loved one

export default router;
