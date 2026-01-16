const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index' /* передаем шаблон index */, {
        title: 'Главная', 
    }) // передаем объект с данными
})

module.exports = router;