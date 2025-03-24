/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("loved_ones", function (table) {
    table.string("loved_one_id", 36).primary();
    table.string("loved_one_name", 255).notNullable();
    table.integer("author_id").unsigned();
    table
      .foreign("author_id")
      .references("author_id")
      .inTable("authors")
      .onDelete("CASCADE");
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("loved_ones");
}
