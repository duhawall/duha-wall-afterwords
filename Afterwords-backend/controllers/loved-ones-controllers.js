import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const router = express.Router();

// add a new author (data) - POST /loved-ones/add-new
const postLovedOne = (req, res) => {
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

// get all author's loved ones - GET /loved-ones/:authorId/all
const getLovedOnesForAuthor = async (req, res) => {
  try {
    const lovedOnesFound = await knex("loved_ones")
      .select("loved_one_name")
      .where({ author_id: req.params.authorId });

    if (lovedOnesFound.length === 0) {
      return res.status(404).json({
        message: `No loved ones created yet for author with ID ${req.params.authorId}`,
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

// get a loved one - GET /:authorId/loved-ones/:lovedOneId
const getLovedOne = async (req, res) => {
  const { authorId, lovedOneId } = req.params;
  try {
    const lovedOne = await knex("loved_ones")
      .select("loved_one_name", "author_id")
      .where("loved_one_id", lovedOneId)
      .andWhere("author_id", authorId)
      .first();

    if (!lovedOne) {
      return res.status(404).json({
        message: `Loved one with ID ${lovedOneId} not found for author with ID ${authorId}.`,
      });
    }

    res.status(200).json(lovedOne);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error retrieving loved one with ID ${lovedOneId} for author with ID ${authorId}.`,
    });
  }
};

// const { email, password, authorName } = req.body;
// const newLovedOne = {
//   id: `${highestId + 1}`,
//   authorName: authorName,
//   email: email,
//   password: password,
// };
// if (!req.body.authorName || !req.body.email || !req.body.password) {
//   return res.status(400).json({ error: "Missing input required." });
// }

// parsedLovedOnesData.push(newLovedOne);

// // update author's data
// const editLovedOne = (req, res) => {
//   console.log(req.body);

//   const authorsData = fs.readFileSync("./data/loved-entries.json", "utf8");
//   const parsedAuthorsData = JSON.parse(authorsData);

//   // Find the author by ID
//   const authorIndex = parsedAuthorsData.findIndex(
//     (author) => author.id === req.params.id
//   );

//   if (authorIndex === -1) {
//     return res.status(404).json({ error: "Author not found" });
//   }

//   // Get the updated data from the request body
//   const { email, password, authorName } = req.body;

//   // Validate the inputs
//   if (!authorName || !email || !password) {
//     return res.status(400).json({ error: "Missing input required." });
//   }

//   // Update the author's information
//   parsedAuthorsData[authorIndex] = {
//     ...parsedAuthorsData[authorIndex],
//     authorName,
//     email,
//     password,
//   };

//   // Save the updated data back to the JSON file
//   fs.writeFileSync(
//     "./data/loved-entries.json",
//     JSON.stringify(parsedAuthorsData, null, 2)
//   );

//   res.json(parsedAuthorsData[authorIndex]); // Return the updated author data
// };

// // delete author's data
// const deleteLovedOne = (req, res) => {
//   try {
//     const { id } = req.params;
//     let authorsData = JSON.parse(
//       fs.readFileSync("./data/loved-entries.json", "utf8")
//     );

//     // Find the author by id
//     const foundAuthor = authorsData.find((author) => author.id === id);
//     console.log("Here's found author:", foundAuthor);

//     if (!foundAuthor) {
//       return res.status(404).json({ message: "No author found with that id" });
//     }

//     // Create the removed author object to send back in the response
//     const { authorName, email, password } = foundAuthor;
//     const removedAuthor = {
//       message: "Author removed successfully",
//       id,
//       authorName,
//       email,
//       password,
//     };
//     console.log("Here's removed author:", removedAuthor);

//     // Filter out the author from the authorsData array
//     authorsData = authorsData.filter((author) => author.id !== id);

//     // Write the updated loved-entries data back to the file
//     fs.writeFileSync(
//       "./data/loved-entries.json",
//       JSON.stringify(authorsData, null, 2)
//     );

//     // Respond with the removed author information
//     res.status(200).json(removedAuthor);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error deleting author" });
//   }
// };

// add loved one name (data)
// const addLovedOne = router.post("/:id/add-loved-one", (req, res) => {
//   console.log(req.body);
//   const authorsData = fs.readFileSync("./data/entries.json", "utf8");
//   const parsedAuthorsData = JSON.parse(authorsData);
//   const allAuthors = parsedAuthorsData.find(
//     (author) => author.id === req.params.id
//   );

//   const { lovedOne } = req.body;
//   const newLovedOne = {
//     // id: id,
//     // authorName: author.authorName,
//     // lovedOneId: uuidv4(),
//     lovedOne,
//     // entires: [],
//     // timestamp: Date.now(),
//   };

//   allAuthors.id.push(newLovedOne);

//   fs.writeFileSync(
//     "./data/entries.json",
//     JSON.stringify(parsedAuthorsData, null, 2)
//   );
//   res.json(newLovedOne);
// });

export {
  getLovedOnesForAuthor,
  postLovedOne,
  getLovedOne,
  // ,  putLovedOne, deleteLovedOne
};
