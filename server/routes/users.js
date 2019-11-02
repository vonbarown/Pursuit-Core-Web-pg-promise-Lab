const express = require('express');
const router = express.Router();

//pg-promise setup
const pgp = require('pg-promise')(); // import promise
const connectionString = "postgres://localhost:5432/facebook_db" //URL where Postgres is running
const db = pgp(connectionString); //connected db instance

router.get('/', async (req, res) => {
    // db.any('SELECT * FROM users')
    //     .then(rows => {
    //         const response = {
    //             users: rows
    //         }
    //         res.json(response);
    //     })
    //     .catch(function (error) {
    //         res.json('An error occurred: ' + error);
    //     });

    //using try-catch with async await
    try {
        let users = await db.any("SELECT * FROM users")
        res.json({
            payload: users,
            message: "Success. Retrieved all the users"
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong"
        })
        console.log(error);
    }
});

router.post('/register', async (req, res) => {
    const user = req.body;
    // .then(() => {
    //     let response = {
    //         addedUser: user
    //     }
    //     res.json(response)
    // })
    // .catch(error => {
    //     res.send("An error occurred: " + error)
    // });

    //using try-catch with async await
    try {
        let insertQuery = `
        INSERT INTO users(firstname, lastname, age)
            VALUES($1, $2, $3)`


        await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age])
        res.json({
            payload: req.body,
            message: 'User registered'
        })
    } catch (error) {
        res.json({
            message: 'There was an error registering the user'
        })
    }
});

module.exports = router;