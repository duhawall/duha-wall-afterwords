import express from "express";
import * as authorsController from "../controllers/authors-controllers.js";

const router = express.Router();

router.route("/");

router
  .route("/:id")
  .get(authorsController.getAuthor) // get user data
  .put(authorsController.putAuthor) // update user data
  .delete(authorsController.deleteAuthor); // delete user

router.route("/add-new").post(authorsController.postAuthor); // add new author

export default router;
