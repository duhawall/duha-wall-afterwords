USE afterwords;

-- to get all users
SELECT * from users;

SELECT * from users where user_id = 1;

-- to get all entries
SELECT * from entries;

SELECT * from entries where author_id = 2;

SELECT DISTINCT users.user_id, users.username
FROM entries
JOIN users ON entries.loved_one_id = users.user_id
WHERE entries.author_id = 2;





