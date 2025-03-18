import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const router = express.Router();

// add new author - POST /authors/add-new
const postAuthor = async (req, res) => {
  const requiredFields = ["author_name", "email", "password"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  try {
    const result = await knex("authors").insert(req.body);

    const newAuthorId = result[0]; // new ID number
    const createdAuthor = await knex("authors")
      .where({
        author_id: newAuthorId,
      })
      .first(); // get the object rather than []

    res.status(201).json(createdAuthor);
  } catch (err) {
    console.error("Error adding author:", err);
    res.status(400).json({
      message: "Error adding author",
      error: err.message,
    });
  }
};

// get author's data - GET /authors/:id
const getAuthor = async (req, res) => {
  try {
    const authorFound = await knex("authors").where({
      author_id: req.params.id,
    });

    if (authorFound.length === 0) {
      return res.status(404).json({
        message: `Author with ID ${req.params.id} not found`,
      });
    }

    const authorData = authorFound[0];
    res.json(authorData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve author data with ID ${req.params.id}`,
    });
  }
};

// update author's data - PUT /authors/:id
const putAuthor = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const allowedFields = ["author_name", "email"];
  console.log("ID here:", updateData);
  const fieldsToUpdate = allowedFields.filter((field) => updateData[field]);
  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({
      message:
        "Please provide at least one field to update (author name and/or email).",
    });
  }
  try {
    const author = await knex("authors").where({ author_id: id }).first();

    if (!author) {
      return res.status(404).json({
        message: `The author with this name: ${{ author_name }} was not found.`,
      });
    }
    const rowsUpdated = await knex("authors")
      .where({ author_id: id })
      .update(updateData);

    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Author with ID ${id} not found.` });
    }

    const updatedAuthor = await knex("authors")
      .where({ author_id: id })
      .first();
    res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error updating author with ID ${id}`,
      error: error.message,
    });
  }
};

// delete author's data - DELETE /authors/:id
const deleteAuthor = async (req, res) => {
  const { author_name, email } = req.body; // Assuming the name and email are passed in the request body.

  if (!author_name || !email) {
    return res.status(400).json({
      message: "Both author name and email are required to delete an author.",
    });
  }

  try {
    const author = await knex("authors").where({ author_name, email }).first();

    if (!author) {
      return res.status(404).json({
        message: `No author found with name: ${author_name} and email: ${email}.`,
      });
    }

    const rowsDeleted = await knex("authors")
      .where({ author_name, email })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(400).json({
        success: false,
        message: `The author with name ${author_name} and email ${email} cannot be deleted. Please try again.`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Author with name ${author_name} and email ${email} was successfully deleted.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while trying to delete the author.",
    });
  }
};

export { postAuthor, getAuthor, putAuthor, deleteAuthor };
