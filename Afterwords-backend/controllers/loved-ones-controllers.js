import express from "express";
import { v4 as uuidv4 } from "uuid";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const router = express.Router();

// add a new author (data) - POST /loved-ones/:id/add-new - localhost:8080/loved-ones/1/add-new
const postLovedOne = async (req, res) => {
  const { lovedOneName } = req.body;
  const { id } = req.params;

  if (!lovedOneName) {
    return res.status(400).json({ error: "Loved One name is required." });
  }

  try {
    const authorExists = await knex("authors").where({ author_id: id }).first();

    if (!authorExists) {
      return res.status(404).json({ error: "Author not found." });
    }

    const newLovedOne = {
      loved_one_id: uuidv4(),
      author_id: id,
      loved_one_name: lovedOneName,
    };

    await knex("loved_ones").insert(newLovedOne);

    res.status(201).json({
      message: "Loved one added successfully.",
      lovedOne: newLovedOne,
    });
  } catch (error) {
    console.error("Error adding loved one:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// get all author's loved ones - GET /loved-ones/:id/all - localhost:8080/loved-ones/1/all
const getLovedOnesForAuthor = async (req, res) => {
  try {
    const lovedOnesFound = await knex("loved_ones")
      .select("loved_one_name")
      .where({ author_id: req.params.id });

    if (lovedOnesFound.length === 0) {
      return res.status(404).json({
        message: `No loved ones created yet for author with ID ${req.params.id}`,
      });
    }

    const lovedOneNames = lovedOnesFound.map(
      (lovedOne) => lovedOne.loved_one_name
    );

    res.json(lovedOneNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve loved ones data for author with ID ${req.params.id}`,
    });
  }
};

// get a loved one - GET /loved-ones/:id/loved-ones/:lovedOneId - localhost:8080/loved-ones/1/loved-ones/101
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
      message: `Error retrieving loved one with ID ${lovedOneId} for author with ID ${id}.`,
    });
    console.log("LovedOne ID:", lovedOneId);
    console.log("author ID:", id);
  }
};

export {
  postLovedOne,
  getLovedOnesForAuthor,
  getLovedOne,
  // ,  putLovedOne, deleteLovedOne
};
