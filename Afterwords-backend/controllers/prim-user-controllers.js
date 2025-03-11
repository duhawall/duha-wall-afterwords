import primUser from "../models/prim-user-model.js";

// Primary User is abbreviated to pu

//
const addPU = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Please provide name and email for the user in the request",
    });
  }

  try {
    const result = await User.createNewPrimUser(req.body);

    const newUserId = result[0];
    const createdUser = await User.getSinglePrimUser(newUserId);

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

const addPULovedOne = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Please provide name and email for the user in the request",
    });
  }

  try {
    const result = await User.createNewPrimUser(req.body);

    const newUserId = result[0];
    const createdUser = await User.getSinglePrimUser(newUserId);

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

const addPULovedOneEntry = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Please provide name and email for the user in the request",
    });
  }

  try {
    const result = await User.createNewPrimUser(req.body);

    const newUserId = result[0];
    const createdUser = await User.getSinglePrimUser(newUserId);

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

const findPU = async (req, res) => {
  try {
    const usersFound = await User.getSinglePrimUser(req.params.id);

    if (usersFound.length === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    const userData = usersFound[0];
    res.json(userData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve user data for user with ID ${req.params.id}`,
    });
  }
};

const updatePU = async (req, res) => {
  try {
    const rowsUpdated = await User.updatePrimUser(req.params.id, req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    const updatedUser = await User.getSinglePrimUser(req.params.id);

    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update user with ID ${req.params.id}: ${error}`,
    });
  }
};

const updatePULovedOne = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const requiredFields = ["pu_name", "password", "pu_loved_one"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }
  try {
    //attempt to see if there is a primUser variable
    const primUser = await knex("primUsers").where({ id }).first();

    if (!primUser) {
      return res.status(404).json({
        //return a 404 error upon failiure to find primUser
        message: `The primary user with ID: ${id} was not found.`,
      });
    }
    if (updateData.id != id) {
      return res.status(400).json({
        message: `a change was attempted on id. Changes on this id is forbidden`,
      });
    }
    // Attempt to update the primUser with the new data
    const rowsUpdated = await knex("primUsers")
      .where({ id })
      .update(updateData);
    // if update is not possible. return with a 404 error.
    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Primary user with ID ${id} is not found.` });
    }

    // Retrieve the updated primUser information
    const updatedPU = await knex("primUsers").where({ id }).first();
    //return with a successful error update.
    res.status(200).json(updatedPU);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error updating primUser with ID ${id}`,
      error: error.message,
    });
  }
};

const updatePULovedOneEntry = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const requiredFields = ["pu_name", "password", "pu_loved_one"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }
  try {
    //attempt to see if there is a primUser variable
    const primUser = await knex("primUsers").where({ id }).first();

    if (!primUser) {
      return res.status(404).json({
        //return a 404 error upon failiure to find primUser
        message: `The primary user with ID: ${id} was not found.`,
      });
    }
    if (updateData.id != id) {
      return res.status(400).json({
        message: `a change was attempted on id. Changes on this id is forbidden`,
      });
    }
    // Attempt to update the primUser with the new data
    const rowsUpdated = await knex("primUsers")
      .where({ id })
      .update(updateData);
    // if update is not possible. return with a 404 error.
    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Primary user with ID ${id} is not found.` });
    }

    // Retrieve the updated primUser information
    const updatedPU = await knex("primUsers").where({ id }).first();
    //return with a successful error update.
    res.status(200).json(updatedPU);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error updating primUser with ID ${id}`,
      error: error.message,
    });
  }
};

const deletePU = async (req, res) => {
  try {
    const rowsDeleted = await User.deletePrimUser(req.params.id);

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete user: ${error}`,
    });
  }
};

const deletePULovedOne = async (req, res) => {
  try {
    const rowsDeleted = await User.deletePrimUser(req.params.id);

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete user: ${error}`,
    });
  }
};

const deletePULovedOneEntry = async (req, res) => {
  try {
    const rowsDeleted = await User.deletePrimUser(req.params.id);

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete user: ${error}`,
    });
  }
};

export {
  addPU,
  addPULovedOne,
  addPULovedOneEntry,
  findPU,
  updatePU,
  updatePULovedOne,
  updatePULovedOneEntry,
  deletePU,
  deletePULovedOne,
  deletePULovedOneEntry,
};
