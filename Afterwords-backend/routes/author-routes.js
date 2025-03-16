import express from "express";
import * as authorsController from "../controllers/authors-controllers.js";
// import * as entriesController from "../controllers/entries-controllers.js";

const router = express.Router();

router.route("/");

router.route("/add-new").post(authorsController.addAuthor); // add new author

router
  .route("/:id")
  .get(authorsController.findAuthor) // get user data
  .put(authorsController.editAuthor); // update user data
//   .delete(authorsController.deleteAuthor); // delete user
//   .post(authorsController.addUser) // add user
//   .post(authorsController.addLovedOne); // add user's loved ones
//   .post(authorsController.addEntry); // add loved one's entry

// router
//   .route("/:id")
//   .get(authorsController.user) // fetch user
//   .get(authorsController.getLovedOne) // fetch user's loved ones
//   .get(authorsController.getAllEntries) // fetch user's all entries for a loved one
//   .get(authorsController.getOneEntry) // fetch user's entry for a loved one
//   .put(authorsController.updateWarehouse) // Edit a warehouse
//   .delete(authorsController.deleteWarehouse);

// router.route("/:id/inventories")
//   .get(entriesController.warInv); // GET Inventories for a Given Warehouse

export default router;
