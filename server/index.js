const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const feedbackRouter = require('./routes/feedback');
const models = require('./models');
// const fs = require('fs');
// const https = require('https');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
  })
);

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('<h1> Server running test </h1>');
});
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/feedback', feedbackRouter);
app.use(cookieParser());
models.sequelize.sync({ force: false });

// let server;
// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(PORT, () => console.log('https server runnning'));
// } else {
//   server = app.listen(PORT, () => console.log('http server runnning'));
// }

app.listen(PORT, () => {
  console.log(`HTTP server listen on ${PORT}`);
});
