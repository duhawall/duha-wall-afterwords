import express from "express";
import fs from "fs"; // file system module

const router = express.Router();

const authorsData = fs.readFileSync("./data/authors.json", "utf8");
const parsedAuthorsData = JSON.parse(authorsData);

// add a new author (data) - POST /authors/add-new
const addAuthor = (req, res) => {
  const existingAuthor = parsedAuthorsData.author.find(
    (author) => author.id === id
  );

  if (existingAuthor) {
    return { error: "Author already exists." };
  }

  if (!existingAuthor) {
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
  }
};

// get author's data - GET /authors/:id
const findAuthor = (req, res) => {
  const foundAuthor = parsedAuthorsData.find((author) => {
    return author.id === req.params.id;
  });

  if (!foundAuthor) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.send(foundAuthor);
};

// update author's data - PUT /authors/:id
const editAuthor = (req, res) => {
  const authorIndex = parsedAuthorsData.findIndex(
    (author) => author.id === req.params.id
  );

  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" });
  }

  const { email, password, authorName } = req.body;

  if (!authorName || !email || !password) {
    return res.status(400).json({ error: "Missing input required." });
  }

  parsedAuthorsData[authorIndex] = {
    ...parsedAuthorsData[authorIndex],
    authorName,
    email,
    password,
  };

  fs.writeFileSync(
    "./data/authors.json",
    JSON.stringify(parsedAuthorsData, null, 2)
  );

  res.json(parsedAuthorsData[authorIndex]); // Return the updated author data
};

// delete author's data - DELETE /authors/:id
const deleteAuthor = (req, res) => {
  try {
    const { id } = req.params;
    let authorsData = JSON.parse(
      fs.readFileSync("./data/authors.json", "utf8")
    );

    // Find the author by id
    const foundAuthor = authorsData.find((author) => author.id === id);
    console.log("Here's found author:", foundAuthor);

    if (!foundAuthor) {
      return res.status(404).json({ message: "No author found with that id" });
    }

    // Create the removed author object to send back in the response
    const { authorName, email, password } = foundAuthor;
    const removedAuthor = {
      message: "Author removed successfully",
      id,
      authorName,
      email,
      password,
    };
    console.log("Here's removed author:", removedAuthor);

    // Filter out the author from the authorsData array
    authorsData = authorsData.filter((author) => author.id !== id);

    // Write the updated authors data back to the file
    fs.writeFileSync(
      "./data/authors.json",
      JSON.stringify(authorsData, null, 2)
    );

    // Respond with the removed author information
    res.status(200).json(removedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting author" });
  }
};

export { addAuthor, findAuthor, editAuthor, deleteAuthor };
