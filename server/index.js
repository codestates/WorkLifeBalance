const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
  })
);

app.get('/', (req, res) => {
  res.send('<h1> Server running test </h1>');
});
app.use('/user', userRouter);
app.use('/task', taskRouter);

app.listen(PORT, () => {
  console.log(`HTTP server listen on ${PORT}`);
});

// ! 테스트 필요
// DB MYSQL 연결됐는지 모름
// Route, Controller, Model 연결되는지
//
