import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

class PrimUser {
  static getSinglePrimUser(userId) {
    return knex("prim-user").where({ id: userId });
  }

  static createNewPrimUser(userData) {
    return knex("prim-user").insert(userData);
  }

  static updatePrimUser(userId, userData) {
    return knex("prim-user").where({ id: userId }).update(userData);
  }

  static deletePrimUser(userId) {
    return knex("prim-user").where({ id: userId }).delete();
  }

  static getPrimUserWithEntries(userId) {
    return knex("prim-user")
      .join("post", "post.user_id", "user.id")
      .where({ user_id: userId });
  }
}

export default PrimUser;
