import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

class User {
  //   static getAllUsers() {
  //     return knex("user");
  //   }

  static getSingleUser(userId) {
    return knex("user").where({ id: userId });
  }

  static createNewUser(userData) {
    return knex("user").insert(userData);
  }

  static updateUser(userId, userData) {
    return knex("user").where({ id: userId }).update(userData);
  }

  static deleteUser(userId) {
    return knex("user").where({ id: userId }).delete();
  }

  static getUserWithEntries(userId) {
    return knex("user")
      .join("post", "post.user_id", "user.id")
      .where({ user_id: userId });
  }
}

export default User;
