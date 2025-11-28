const express = require('express');
const app = express();

const logger =require('./middleware/logger');
const error404 = require('./middleware/err-404')
const bookRouter = require('./routes/book');
const unload = require('./middleware/unload');

app.use('/api/books', bookRouter)
app.use(logger);
app.use(error404)

router.post('/', unload.single('fileBook'), creatBook)

const PORT = process.env.PORT || 3000;
app.listen(PORT)