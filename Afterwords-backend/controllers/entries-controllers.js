import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// const lovedOnesData = fs.readFileSync("./data/loved-entries.json", "utf8");
// const parsedLovedOnesData = JSON.parse(lovedOnesData);

// add a new author (data) - POST /loved-ones/:id/add-new
const addEntry = (req, res) => {
  const { lovedOneName } = req.body;
  const { id: authorId } = req.params;

  const author = parsedLovedOnesData.find((author) => author.id === authorId);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const existingLovedOne = author.lovedOnes.find(
    (lovedOneUser) => lovedOneUser.lovedOneName === lovedOneName
  );

  if (existingLovedOne) {
    return res.json({
      error: "Loved One already exists. Please try a different name",
    });
  }

  const newLovedOne = {
    lovedOneId: uuidv4(),
    lovedOneName: lovedOneName,
    entries: [],
  };

  author.lovedOnes.push(newLovedOne);

  fs.writeFileSync(
    "./data/loved-entries.json",
    JSON.stringify(parsedLovedOnesData, null, 2)
  );

  return res.status(201).json(newLovedOne);
};

export {
  addEntry,
  // , findEntry, editEntry, deleteEntry
};
