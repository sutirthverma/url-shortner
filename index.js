const express = require('express');
const path = require('path');
const {connectMongoDb} = require('./connection');
const app = express();
const cookiesParser = require('cookie-parser');
const urlRouter = require('./routes/url_routes');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/users_router')
const {
    restrictToLoggedInUserOnly,
    checkAuth
} = require('./middlewares/auth_middleware');
const PORT = 8001;

connectMongoDb('mongodb://localhost:27017/url-shortner')
.then(() => console.log('MongoDb Connected'));

//Ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookiesParser());

//Router
app.use('/url', restrictToLoggedInUserOnly, urlRouter);
app.use('/', checkAuth, staticRouter);
app.use('/user', userRouter);

app.listen(PORT, () => console.log('Server Started'));
