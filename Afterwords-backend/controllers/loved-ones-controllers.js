import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const router = express.Router();

// add a new author (data) - POST /loved-ones/:id/add-new - localhost:8080/loved-ones/1/add-new
const postLovedOne = async (req, res) => {
  const { loved_one_name } = req.body;
  const { id } = req.params;

  if (!loved_one_name) {
    return res.status(400).json({ error: "Loved One name is required." });
  }

  try {
    const authorExists = await knex("authors").where({ author_id: id }).first();

    if (!authorExists) {
      return res.status(404).json({ error: "Author not found." });
    }

    const highestIdData = await knex("loved_ones")
      .max("loved_one_id as highestId")
      .first();

    if (!highestIdData || isNaN(Number(highestIdData.highestId))) {
      return res.status(500).json({
        error: "Internal server error to fetch highest loved one ID.",
      });
    }
    console.log("What is highestIdData", highestIdData);

    const newLovedOneId = (Number(highestIdData.highestId) || 0) + 1;

    const newLovedOne = {
      author_id: id,
      loved_one_id: newLovedOneId,
      loved_one_name: loved_one_name,
    };

    await knex("loved_ones").insert(newLovedOne);

    res.status(201).json({
      message: "Loved one added successfully.",
      lovedOne: newLovedOne,
    });
  } catch (error) {
    console.error("Error adding loved one:", error);
    res
      .status(500)
      .json({ error: "Internal server error to add a new loved one." });
  }
};

// get all author's loved ones - GET /loved-ones/:id/all - localhost:8080/loved-ones/1/all
const getLovedOnesForAuthor = async (req, res) => {
  try {
    const lovedOnesFound = await knex("loved_ones")
      // .select("loved_one_name")
      .where({ author_id: req.params.id });

    if (lovedOnesFound.length === 0) {
      return res.status(404).json({
        message: `No loved ones created yet for author with ID ${req.params.id}`,
      });
    }
    console.log(lovedOnesFound);
    const lovedOneNames = lovedOnesFound.map(
      (lovedOne) => lovedOne.loved_one_name
    );

    res.json(lovedOnesFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Internal server error to retrieve loved ones data for author with ID ${req.params.id}`,
    });
  }
};

// get a loved one - GET /loved-ones/:id/loved-one/:lovedOneId - localhost:8080/loved-ones/1/loved-one/101
const getLovedOne = async (req, res) => {
  const { id, lovedOneId } = req.params;
  try {
    const lovedOne = await knex("loved_ones")
      .select("loved_one_name", "author_id")
      .where("loved_one_id", lovedOneId)
      .andWhere("author_id", id)
      .first();

    if (!lovedOne) {
      return res.status(404).json({
        message: `Loved one with ID ${lovedOneId} not found for author with ID ${id}.`,
      });
    }

    res.status(200).json(lovedOne);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Internal server error retrieving loved one with ID ${lovedOneId} for author with ID ${id}.`,
    });
    console.log("LovedOne ID:", lovedOneId);
    console.log("author ID:", id);
  }
};

// update a loved one - PUT /loved-ones/:id/loved-one/:lovedOneId - localhost:8080/loved-ones/1/loved-one/101
const putLovedOne = async (req, res) => {
  const { lovedOneName } = req.body;
  const { id, lovedOneId } = req.params;

  if (!lovedOneName) {
    return res
      .status(400)
      .json({ error: "Loved One name is required for update." });
  }

  try {
    const lovedOne = await knex("loved_ones")
      .where({ loved_one_id: lovedOneId, author_id: id })
      .first();

    if (!lovedOne) {
      return res
        .status(404)
        .json({ error: "Loved One not found for this author." });
    }

    await knex("loved_ones")
      .where({ loved_one_id: lovedOneId, author_id: id })
      .update({ loved_one_name: lovedOneName });

    res.status(200).json({
      message: "Loved One updated successfully.",
      lovedOne: { lovedOneId, id, lovedOneName },
    });
  } catch (error) {
    console.error("Error updating loved one:", error);
    res
      .status(500)
      .json({ error: "Internal server error updating the loved one" });
  }
};

// delete a loved one - DELETE /loved-ones/:id/loved-one/:lovedOneId - localhost:8080/loved-ones/1/loved-one/101
const deleteLovedOne = async (req, res) => {
  const { id, lovedOneId } = req.params;
  try {
    const lovedOne = await knex("loved_ones")
      .where({ author_id: id, loved_one_id: lovedOneId })
      .first();
    console.log("Who's the loved one?", lovedOne);

    if (!lovedOne) {
      return res.status(404).json({
        message: `Loved one ID ${lovedOneId} is not found.`,
      });
    }

    const rowsDeleted = await knex("loved_ones")
      .where({ loved_one_id: lovedOneId })
      .del();

    if (rowsDeleted === 0) {
      return res.status(400).json({
        success: false,
        message: `Error deleting loved one ID ${lovedOneId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Loved one ID ${lovedOneId} was successfully deleted.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Internal server error occurred when trying to delete loved one ID ${lovedOneId}. Please try again.`,
    });
  }
};

export {
  postLovedOne,
  getLovedOnesForAuthor,
  getLovedOne,
  putLovedOne,
  deleteLovedOne,
};
