/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable("entries", function (table) {
    table.dropForeign("author_id"); // Prevents duplicate foreign key error
    table
      .foreign("author_id")
      .references("authors.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("entries", function (table) {
    table.uuid("entry_id").primary(); // entry_id as UUID
    table
      .integer("author_id")
      .unsigned()
      .references("authors.author_id")
      .inTable("authors")
      .onDelete("CASCADE"); // Foreign key for author_id
    table
      .uuid("loved_one_id")
      .unsigned()
      .references("loved_ones.loved_one_id")
      .inTable("loved_ones")
      .onDelete("CASCADE"); // Foreign key for loved_one_id
    table.string("title", 255).notNullable(); // Title column
    table.text("content").notNullable(); // Content column
    table.bigInteger("timestamp").notNullable();
    table
      .foreign("author_id")
      .references("authors.author_id")
      .onDelete("CASCADE");
    table
      .foreign("loved_one_id")
      .references("loved_ones.loved_one_id")
      .onDelete("CASCADE");
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("entries");
}
