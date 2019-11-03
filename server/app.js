const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users.js');
const postRouter = require('./routes/post.js');
const likesRouter = require('./routes/likes.js')

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/likes', likesRouter);

app.use('/', (req, res) => {
    res.send('Welcome to Facebook')
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}!`);
});