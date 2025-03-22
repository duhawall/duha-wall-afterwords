USE afterwords;

CREATE TABLE authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO authors (author_id, author_name, email, password) VALUES
('1', 'Amelia Carter', 'amelia.carter@email.com', 'hashed_password_1'),
('2', 'Nathaniel Wright', 'nathaniel.wright@email.com', 'hashed_password_2'),
('3', 'Isabella Monroe', 'isabella.monroe@email.com', 'hashed_password_3'),
('4', 'Liam Bennett', 'liam.bennett@email.com', 'hashed_password_4'),
('5', 'Sophia Hayes', 'sophia.hayes@email.com', 'hashed_password_5');

CREATE TABLE loved_ones (
    loved_one_id CHAR(36) PRIMARY KEY,
    loved_one_name VARCHAR(255) NOT NULL,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

INSERT INTO loved_ones (loved_one_id, loved_one_name, author_id) VALUES
('101', 'Shaun Adams', '1'),
('102', 'Emily Carter', '1'),
('103', 'Mason Wright', '2'),
('104', 'Charlotte Monroe', '2'),
('105', 'Ethan Hayes', '3'),
('106', 'Olivia Bennett', '4'),
('107', 'Lucas Hayes', '5');

CREATE TABLE entries (
    entry_id CHAR(36) PRIMARY KEY,
    author_id INT,
    loved_one_id CHAR(36),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    timestamp BIGINT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
    FOREIGN KEY (loved_one_id) REFERENCES loved_ones(loved_one_id) ON DELETE CASCADE
);

INSERT INTO entries (entry_id, title, content, timestamp, author_id, loved_one_id) VALUES
('2f8e3f10-b0a7-4c83-bf93-9089f607def7', 'Until We Meet Again', 'Love is not measured in days but not today out of all days', 1673344800, '1', '101'),
('7d3b9cb7-90ea-4bfa-9a51-4c2a4b8d9f2d', 'The Light You Left Behind', 'You were always the warmth...', 1676477400, '1', '101'),
('1f2c7ea9-d052-48e0-8b0c-69085e746d1f', 'If Love Had a Shape', 'If love had a shape...', 1679301900, '1', '102'),
('943f13d0-2488-4feb-ab80-101a7db0f9c8', 'A Whisper in the Wind', 'I still reach for your hand...', 1680705600, '2', '103'),
('922f13d0-2488-4feb-7s81-101a7db0f9c8', 'The Echo of Us', 'Love is not measured in days...', 1683528000, '3', '105'),
('b4c2e1f8-24a2-467b-bb8b-908cbf7e1234', 'You Are My Always', 'Even in the silence...', 1686611400, '4', '106');