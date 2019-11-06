DROP DATABASE IF EXISTS facebook_db;

CREATE DATABASE facebook_db;

\c facebook_db;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    age INT
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    poster_id INT REFERENCES users (id) ON DELETE CASCADE,
    body VARCHAR
);

CREATE TABLE likes
(
    id SERIAL PRIMARY KEY,
    liker_id INT REFERENCES users (id) ON DELETE CASCADE,
    post_id INT REFERENCES posts (id) ON DELETE CASCADE
);

-- Add some users
INSERT INTO users
    (firstname, lastname, age)
VALUES('Adam', 'Addams', 40),
    ('Beth', 'Brown', 51),
    ('Cal', 'Cassady', 14),
    ('Don', 'Donner', 33),
    ('Eve', 'Edwards', 83);

-- Add some posts
INSERT INTO posts
    (poster_id, body)
VALUES(1, 'I am Adam! Hello!'),
    (1, 'I like pancakes'),
    (2, 'I am Beth! Welcome to my blog.'),
    (2, 'My zodiac sign is Gemini'),
    (3, 'I am Cal! This is my first post :)'),
    (4, 'I am Don! Hello world!'),
    (4, 'I enjoy long walks on the beach'),
    (5, 'I am Eve! Welcome!'),
    (5, 'I like turtles'),
    (5, 'My favorite number is 8');

INSERT INTO likes
    (liker_id, post_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 5),
    (3, 6),
    (5, 7),
    (2, 8),
    (4, 9),
    (5, 6),
    (3, 10),
    (4, 3);


-- SELECT  posts.id AS post_id, COUNT(posts.id) AS times_liked
--   from posts
--   JOIN likes ON posts.id = likes.post_id
--   GROUP BY posts.id
--   ORDER BY times_liked DESC;

SELECT *
from users
    JOIN posts ON users.id = posts.poster_id
WHERE posts.id = (
    SELECT posts.id
FROM posts
    JOIN likes ON posts.id = likes.post_id
GROUP BY posts.id
ORDER BY COUNT(posts.body) DESC
      LIMIT 1
  );

-- Let's vesxerify that the users and posts were inserted 
-- SELECT * FROM users;
-- SELECT * FROM posts;
-- SELECT * FROM Likes;