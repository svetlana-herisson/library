const express = require('express');
const logger = require('./middleware/logger');
const error404 = require('./middleware/err-404')
const apiRouter = require('./routes/apiRouter');
const indexRouter = require('./routes/indexRouter'); 
const ejsRouter = require('./routes/books');


const app = express();

// app.use(logger);
// app.use(express.json())
// app.use('/', bookRouterApi)

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/books', ejsRouter);

app.use(error404)


const PORT = process.env.PORT || 3000;
app.listen(PORT)