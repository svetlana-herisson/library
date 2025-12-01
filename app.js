const express = require('express');
const logger = require('./src/middleware/logger');
const error404 = require('./src/middleware/err-404')
const bookRouter = require('./src/routes/book');
const unload = require('./src/middleware/unload');

const app = express();

app.use(logger);
app.use(express.json())
app.use('/', bookRouter)


app.use(error404)

const PORT = process.env.PORT || 3000;
app.listen(PORT)