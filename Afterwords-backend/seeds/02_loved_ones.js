/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("loved_ones").del(); // Deletes existing entries
  await knex("loved_ones").insert([
    { loved_one_id: "101", loved_one_name: "Shaun Adams", author_id: 1 },
    { loved_one_id: "102", loved_one_name: "Emily Carter", author_id: 1 },
    { loved_one_id: "103", loved_one_name: "Mason Wright", author_id: 2 },
    { loved_one_id: "104", loved_one_name: "Charlotte Monroe", author_id: 2 },
    { loved_one_id: "105", loved_one_name: "Ethan Hayes", author_id: 3 },
    { loved_one_id: "106", loved_one_name: "Olivia Bennett", author_id: 4 },
    { loved_one_id: "107", loved_one_name: "Lucas Hayes", author_id: 5 },
  ]);
}
