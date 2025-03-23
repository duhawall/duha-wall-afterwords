/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("authors").del();
  await knex("authors").insert([
    {
      author_id: 1,
      author_name: "Amelia Carter",
      email: "amelia.carter@email.com",
      password: "hashed_password_1",
    },
    {
      author_id: 2,
      author_name: "Nathaniel Wright",
      email: "nathaniel.wright@email.com",
      password: "hashed_password_2",
    },
    {
      author_id: 3,
      author_name: "Isabella Monroe",
      email: "isabella.monroe@email.com",
      password: "hashed_password_3",
    },
    {
      author_id: 4,
      author_name: "Liam Bennett",
      email: "liam.bennett@email.com",
      password: "hashed_password_4",
    },
    {
      author_id: 5,
      author_name: "Sophia Hayes",
      email: "sophia.hayes@email.com",
      password: "hashed_password_5",
    },
  ]);
}
