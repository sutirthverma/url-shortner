const express = require('express');
const {connectMongoDb} = require('./connection');
const app = express();
const urlRouter = require('./routes/url_routes');
const PORT = 8001;

connectMongoDb('mongodb://localhost:27017/url-shortner')
.then(() => console.log('MongoDb Connected'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/url', urlRouter);

app.listen(PORT, () => console.log('Server Started'));