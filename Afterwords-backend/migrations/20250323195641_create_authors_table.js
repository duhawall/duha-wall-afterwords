/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("authors", function (table) {
    table.increments("author_id").primary(); // Auto-incrementing primary key
    table.string("author_name", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("password", 255).notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("authors");
}
