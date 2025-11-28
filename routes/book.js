const express = require('express');
const router = express.Router();
const { createBook, getBookById, downloadBook } = require('../controllers/bookController');
const upload = require('../middleware/unload');


router.post('/', createBook);
router.get('/:id', getBookById);
router.get('/:id/download', downloadBook);

module.exports = router;