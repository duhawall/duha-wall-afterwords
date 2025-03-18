USE afterwords;

-- to get all users
SELECT * from authors;

SELECT * from authors where author_id = 1;

-- to get all loved ones
SELECT * from loved_ones;

DELETE from authors
WHERE author_id = '10';

DELETE from loved_ones
WHERE loved_one_id = '110';

SELECT * from loved_ones where author_id = 1;

-- to get all entries
SELECT * from entries;

SELECT * from entries where author_id = 2;

SELECT DISTINCT authors.user_id, authors.username
FROM entries
JOIN users ON entries.loved_one_id = authors.user_id
WHERE entries.author_id = 2;

DESCRIBE loved_ones;




