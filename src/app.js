const express = require('express');
const logger = require('../middleware/logger');
const error404 = require('../middleware/err-404')
const apiRouter = require('./routes/apiRouter');
const indexRouter = require('./routes/indexRouter'); 
const ejsRouter = require('./routes/books');
const mongoose = require('mongoose');
require('dotenv').config();
const { myContainer } = require("./inversify.config") ;



const app = express();

// app.use(logger);
// app.use(express.json())
// app.use('/', bookRouterApi)

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/books', ejsRouter);

app.use(error404)

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB); // подключение к БД
        app.listen(PORT) // запускаем сервер
        console.log('start');
        
    } catch (e) {
        console.log(e);
        
    }
}

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';
const PORT = process.env.PORT || 3000;

start(PORT, UrlDB)
