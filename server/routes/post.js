const express = require('express');
const router = express.Router();

const {
    db
} = require('./database/pgPromiseFile'); //connected db instance


router.get('/', async (req, res) => {

    try {
        let post = await db.any(`SELECT * FROM posts`)
        res.json({
            payload: post,
            message: "Success. Retrieved all the posts"
        })
    } catch (error) {
        res.json({
            message: "There was an error, try again"
        })
    }

});

router.get('/:user_id', async (req, res) => {
    // let userId = req.params.user_id;

    // try {
    //     let specPost = await db.any(`SELECT * FROM post WHERE post.id = ${req.params.user_id}`)
    //     res.json({
    //         results: specPost,
    //         message: "Success. Retrieved the posts"
    //     })

    // } catch (error) {

    // }

});

router.post('/register', (req, res) => {
    res.send('Creating new post!');
});

module.exports = router;