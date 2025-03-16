import express from "express";
import fs from "fs"; // file system module
// import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const authorsData = fs.readFileSync("./data/authors.json", "utf8");
const parsedAuthorsData = JSON.parse(authorsData);

// add author (data)
const addAuthor = (req, res) => {
  //   console.log(req.body);
  const highestId =
    parsedAuthorsData.length > 0
      ? Math.max(...parsedAuthorsData.map((entry) => entry.id))
      : 0;

  const { email, password, authorName } = req.body;
  const newAuthor = {
    id: `${highestId + 1}`,
    authorName: authorName,
    email: email,
    password: password,
  };
  if (!req.body.authorName || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Missing input required." });
  }

  parsedAuthorsData.push(newAuthor);

  fs.writeFileSync(
    "./data/authors.json",
    JSON.stringify(parsedAuthorsData, null, 2)
  );
  res.json(newAuthor);
};

// get one user data
const findAuthor = (req, res) => {
  const authorsData = fs.readFileSync("./data/authors.json", "utf8");
  const parsedAuthors = JSON.parse(authorsData);
  console.log(authorsData);
  const foundAuthor = parsedAuthors.find((author) => {
    return author.id === req.params.id;
  });

  if (!foundAuthor) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.send(foundAuthor);
};

const editAuthor = (req, res) => {
  console.log(req.body);

  const authorsData = fs.readFileSync("./data/authors.json", "utf8");
  const parsedAuthorsData = JSON.parse(authorsData);

  // Find the author by ID
  const authorIndex = parsedAuthorsData.findIndex(
    (author) => author.id === req.params.id
  );

  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" });
  }

  // Get the updated data from the request body
  const { email, password, authorName } = req.body;

  // Validate the inputs
  if (!authorName || !email || !password) {
    return res.status(400).json({ error: "Missing input required." });
  }

  // Update the author's information
  parsedAuthorsData[authorIndex] = {
    ...parsedAuthorsData[authorIndex],
    authorName,
    email,
    password,
  };

  // Save the updated data back to the JSON file
  fs.writeFileSync(
    "./data/authors.json",
    JSON.stringify(parsedAuthorsData, null, 2)
  );

  res.json(parsedAuthorsData[authorIndex]); // Return the updated author data
};

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

// router.delete("/:photoId/comments/:commentId", (req, res) => {
//   try {
//     const { photoId, commentId } = req.params;
//     const photosData = JSON.parse(
//       fs.readFileSync("./data/photos.json", "utf8")
//     );

//     const foundPhoto = photosData.find((photo) => photo.id === photoId);
//     if (!foundPhoto) {
//       return res.status(404).json({ message: "No photo with that id found" });
//     }

//     const foundComment = foundPhoto.comments.find(
//       (comment) => comment.id === commentId
//     );
//     if (!foundComment) {
//       return res.status(404).json({ message: "No comment with that id found" });
//     }

//     const { name, comment, id, timestamp } = foundComment;
//     const removedComment = {
//       message: "Comment deleted successfully",
//       name,
//       comment,
//       id,
//       timestamp,
//     };

//     foundPhoto.comments = foundPhoto.comments.filter(
//       (comment) => comment.id !== commentId
//     );

//     fs.writeFileSync("./data/photos.json", JSON.stringify(photosData));

//     res.status(200).json(removedComment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error deleting comment" });
//   }
// });

// export {};

export { addAuthor, findAuthor, editAuthor };
