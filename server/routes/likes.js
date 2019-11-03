const express = require('express');
const router = express.Router();

const {
    db
} = require('./database/pgPromiseFile'); //connected db instance


router.get('/', async (req, res) => {

    try {
        let post = await db.any(`SELECT * FROM likes`)
        res.json({
            payload: post,
            message: "Success. Retrieved all the likes"
        })
    } catch (error) {
        res.json({
            message: "There was an error, try again"
        })
    }

});

router.get('/popular', async (req, res) => {
    try {
        let insertQuery = `
        SELECT * from users
        JOIN posts ON users.id = posts.poster_id
        WHERE posts.id = (
            SELECT posts.id FROM posts JOIN likes ON posts.id = likes.post_id 
            GROUP BY posts.id ORDER BY COUNT(posts.body) DESC LIMIT 1
        );
        `
        let num1 = await db.any(insertQuery)
        res.json({
            payload: num1,
            message: 'Success, request sent'
        })
    } catch (error) {
        res.json({
            message: 'There was an error registering the post'
        })
        console.log(error);
    }
});

router.get('/num', async (req, res) => {
    try {
        let insertQuery = `
        SELECT posts.id AS post_id, COUNT(posts.id) AS times_liked
        from posts
        JOIN likes ON posts.id = likes.post_id
        GROUP BY posts.id
        ORDER BY times_liked DESC
        `
        let liked = await db.any(insertQuery)
        res.json({
            payload: liked,
            message: 'Success, request sent'
        })
    } catch (error) {
        res.json({
            message: 'There was an error registering the post'
        })
        console.log(error);
    }
});

router.get('/:liker_id', async (req, res) => {
    let likerId = Number(req.params.liker_id);
    try {
        let specPost = await db.any('SELECT * FROM likes WHERE liker_id = $1', [likerId])
        res.json({
            results: specPost,
            message: "Success. Retrieved the likes"
        })

    } catch (error) {
        res.json({
            message: `You took a wrong turn`
        })
    }

});

router.post('/register', async (req, res) => {
    try {
        let insertQuery = `
        INSERT INTO likes (liker_id,post_id)
            VALUES($1, $2)`

        await db.none(insertQuery, [req.body.liker_id, req.body.post_id])
        res.json({
            payload: req.body,
            message: 'Success, request sent'
        })
    } catch (error) {
        res.json({
            message: 'There was an error registering the post'
        })
        console.log(error);
    }
});


module.exports = router;