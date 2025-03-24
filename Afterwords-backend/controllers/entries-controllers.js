import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// get all loved one's entries - GET /:id/:lovedOneId/entries - localhost:8080/entries/1/101/entries
const getLovedOneEntries = async (req, res) => {
  const { id, lovedOneId } = req.params;

  try {
    const authorExists = await knex("authors").where({ author_id: id }).first();
    if (!authorExists) {
      return res.status(404).json({ error: "Author not found." });
    }

    const lovedOneExists = await knex("loved_ones")
      .where({ loved_one_id: lovedOneId, author_id: id })
      .first();
    if (!lovedOneExists) {
      return res
        .status(404)
        .json({ error: "Loved one not found for this author." });
    }

    const entries = await knex("entries")
      .where({ author_id: id, loved_one_id: lovedOneId })
      .select("entry_id", "title", "content", "timestamp");

    if (entries.length === 0) {
      return res
        .status(404)
        .json({ error: "No entries found for this loved one." });
    }

    res.status(200).json({ entries });
  } catch (error) {
    console.error(
      `Error retrieving entries for loved one ${lovedOneId}`,
      error
    );
    res
      .status(500)
      .json({ error: "Internal server error retrieving entries." });
  }
};

// add a new entry - POST /entries/:id/:lovedOneId/entry/add-new - localhost:8080/entries/1/101/entry/add-new
const addEntry = async (req, res) => {
  const { title, content } = req.body;
  const { id, lovedOneId } = req.params;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: "Please fill in title and content first." });
  }

  try {
    const authorExists = await knex("authors").where({ author_id: id }).first();
    if (!authorExists) {
      return res.status(404).json({ error: "Author not found." });
    }

    const lovedOneExists = await knex("loved_ones")
      .where({ loved_one_id: lovedOneId })
      .first();
    if (!lovedOneExists) {
      return res.status(404).json({ error: "Loved one not found." });
    }

    const newEntry = {
      entry_id: uuidv4(),
      author_id: id,
      loved_one_id: lovedOneId,
      title,
      content,
      timestamp: Date.now(),
    };

    await knex("entries").insert(newEntry);

    res.status(201).json({
      message: "Entry added successfully",
      entry: newEntry,
    });
  } catch (error) {
    console.error(`Error adding entry ${entry_id}`, error);
    res
      .status(500)
      .json({ error: `Internal server error adding entry ${entry_id}` });
  }
};

// get an entry - GET /entries/:id/:lovedOneId/entry/:entryId - localhost:8080/entries/1/101/entry/37959d68-25df-46a0-bba0-df6601efd612
const getEntry = async (req, res) => {
  const { id, lovedOneId, entryId } = req.params;

  try {
    const entry = await knex("entries")
      .where({ entry_id: entryId, author_id: id, loved_one_id: lovedOneId })
      .first();

    if (!entry) {
      return res.status(404).json({ error: "Entry not found." });
    }

    res.status(200).json({
      message: "Entry found successfully.",
      entry,
    });
  } catch (error) {
    console.error(`Error getting entry ${entryId}`, error);
    res
      .status(500)
      .json({ error: `Internal server error getting entry ${entryId}` });
  }
};

// update an entry - PUT /entries/:id/:lovedOneId/entry/:entryId - localhost:8080/entries/1/101/entry/37959d68-25df-46a0-bba0-df6601efd612
const putEntry = async (req, res) => {
  const { title, content } = req.body;
  const { id, lovedOneId, entryId } = req.params;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: "Please fill in title and content first." });
  }

  try {
    const authorExists = await knex("authors").where({ author_id: id }).first();
    if (!authorExists) {
      return res.status(404).json({ error: "Author not found." });
    }

    const lovedOneExists = await knex("loved_ones")
      .where({ loved_one_id: lovedOneId })
      .first();
    if (!lovedOneExists) {
      return res.status(404).json({ error: "Loved one not found." });
    }

    const entry = await knex("entries")
      .where({ entry_id: entryId, author_id: id, loved_one_id: lovedOneId })
      .first();

    if (!entry) {
      return res.status(404).json({ error: "Entry not found." });
    }

    const updatedEntry = {
      title,
      content,
      timestamp: Date.now(),
    };

    await knex("entries")
      .where({ entry_id: entryId, author_id: id, loved_one_id: lovedOneId })
      .update(updatedEntry);

    res.status(200).json({
      message: "Entry updated successfully",
      entry: { ...entry, ...updatedEntry },
    });
  } catch (error) {
    console.error(`Error updating entry ${entryId}`, error);
    res
      .status(500)
      .json({ error: `Internal server error updating entry ${entryId}` });
  }
};

const deleteEntry = async (req, res) => {
  const { id, lovedOneId, entryId } = req.params;

  try {
    const entry = await knex("entries")
      .where({ entry_id: entryId, author_id: id, loved_one_id: lovedOneId })
      .first();

    if (!entry) {
      return res.status(404).json({ error: "Entry not found." });
    }

    await knex("entries")
      .where({ entry_id: entryId, author_id: id, loved_one_id: lovedOneId })
      .del();

    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (error) {
    console.error(`Error deleting entry ${entryId}`, error);
    res
      .status(500)
      .json({ error: `Internal server error deleting entry ${entryId}` });
  }
};

export { getLovedOneEntries, addEntry, getEntry, putEntry, deleteEntry };
