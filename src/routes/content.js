
const express = require('express');
const router = express.Router();

// Страница добавления персонажа или артефакта
router.get('/add-item', (req, res) => {
    res.render('add-item', {
        pageTitle: 'Добавить Персонажа или Артефакт'
    });
});

// Страница добавления истории
router.get('/add-story', (req, res) => {
    res.render('add-story', {
        pageTitle: 'Добавить Историю'
    });
});

// Страница добавления иллюстрации или видео
router.get('/add-media', (req, res) => {
    res.render('add-media', {
        pageTitle: 'Добавить Иллюстрацию или Видео'
    });
});

module.exports = router;
