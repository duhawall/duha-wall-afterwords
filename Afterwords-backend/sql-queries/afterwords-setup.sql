USE afterwords;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Store a hashed password
    role ENUM('author', 'loved_one') NOT NULL
);

CREATE TABLE entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    timestamp BIGINT NOT NULL,  -- Store timestamp in milliseconds
    author_id INT,
    loved_one_id INT,
    FOREIGN KEY (author_id) REFERENCES users(user_id),
    FOREIGN KEY (loved_one_id) REFERENCES users(user_id)
);

