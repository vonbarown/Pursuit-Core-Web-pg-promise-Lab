# Pursuit-Core-Web-pg-promise-Lab

Continuing the starter project [here](), add the following features:

## 1. Posts

### Backend

Complete the `posts.js` file adding implementations for the following routes

- /posts/all
- /posts/:user_id
- /posts/register

### Frontend

Add UI elements to:

- Display all posts
- Display all posts from a given user
- Create a new post

## 2. Likes

Add a new table `likes` that represents a user liking a post.  It should have the structure below:

- Likes
  - `id`: integer, **primary key**
  - `liker_id`: integer, **foreign key** referencing the column `id` in Users
  - `post_id`: integer, **foreign key** referencing the column `id` in Posts.

Seed the database with likes.

Then, add the following functionality:

- Display the number of likes of each post
- Display users who have liked each post
- Filter posts by the number of likes (show only posts with 5+ likes)
