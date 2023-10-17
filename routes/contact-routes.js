const express = require('express');
const router = express.Router(); // создаем роутер
const { getContact } = require('../controller/contact-controller')

router.get('/contacts', getContact)

module.exports = router;