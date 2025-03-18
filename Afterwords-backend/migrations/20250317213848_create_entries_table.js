/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("entries", (table) => {
    table.uuid("id").primary();
    table
      .uuid("author_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .uuid("loved_one_id")
      .references("id")
      .inTable("loved_ones")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("entries");
}
