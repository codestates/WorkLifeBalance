const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
// TODO: const userRouter = require('');
// TODO: const taskRouter = require('');

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: [/* 'URL' */],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS']
    })
);

// 라우팅 어떻게?
// 1. route 폴더 따로 만들어서 /user, /task 관리
// 2. 여기에 /user/login, /task/list 등 각 API 모두 적어놓기
// TODO: app.use('/user', userRouter);
// TODO: app.use('/task', taskRouter);
// ? app.post('/user/login', userController.login.post)

app.listen(PORT, () => {
    console.log(`HTTP server listen on ${PORT}`)
});