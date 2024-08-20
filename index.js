const express = require('express');
const path = require('path');
const {connectMongoDb} = require('./connection');
const app = express();
const urlRouter = require('./routes/url_routes');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/users_router')
const PORT = 8001;

connectMongoDb('mongodb://localhost:27017/url-shortner')
.then(() => console.log('MongoDb Connected'));

//Ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Router
app.use('/url', urlRouter);
app.use('/', staticRouter);
app.use('/user', userRouter);

app.listen(PORT, () => console.log('Server Started'));
