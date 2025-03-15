// import express from "express";
// import fs from "fs"; // file system module

// const router = express.Router();

// // get all user data
// const findAuthor =
// router.get("/", (req, res) => {
//   const authorData = fs.readFileSync("./data/authors.json", "utf8");
//   res.send(authorData);
// });

// // get one user data
// router.get("/:id", (req, res) => {
//   const authorsData = fs.readFileSync("./data/authors.json", "utf8");
//   const parsedAuthors = JSON.parse(authorsData);
//   const foundAuthor = parsedAuthors.find((author) => {
//     return author.id === req.params.id;
//   });
//   res.send(foundAuthor);
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
