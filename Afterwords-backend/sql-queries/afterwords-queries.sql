USE afterwords;

-- to get all users
SELECT * from authors;

SELECT * from authors where author_id = 1;

-- to get all loved ones
SELECT * from loved_ones;

SET SQL_SAFE_UPDATES = 0;


DELETE from loved_ones
WHERE loved_one_id IN (108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119);

SELECT * from loved_ones where author_id = 1;

-- to get all entries
SELECT * from entries;

SELECT * from entries where author_id = 2;

SELECT DISTINCT authors.user_id, authors.username
FROM entries
JOIN users ON entries.loved_one_id = authors.user_id
WHERE entries.author_id = 2;

DESCRIBE loved_ones;

SELECT * FROM knex_migrations;
SET SQL_SAFE_UPDATES = 1;

DELETE FROM knex_migrations WHERE name = '20250317213823_create_users_table.js';

DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS loved_ones;
DROP TABLE IF EXISTS entries;

SELECT CONSTRAINT_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'entries' AND COLUMN_NAME = 'author_id';






