const express = require('express');
const {connectMongoDb} = require('./connection');
const app = express();
const PORT = 8000;

connectMongoDb('mongodb://localhost:27017/rest-api-learn')
.then(() => console.log('MongoDb Connected'));


app.listen(PORT, () => console.log('Server Started'));