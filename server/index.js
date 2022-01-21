const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const models = require('./models');

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: [/* 'URL' */],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS']
    })
);

app.get('/', (req, res) => {
    res.send("<h1> Server running test </h1>")
})
app.use('/user', userRouter);
app.use('/task', taskRouter);
models.sequelize.sync({ force: false });

app.listen(PORT, () => {
    console.log(`HTTP server listen on ${PORT}`)
});