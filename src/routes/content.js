
const express = require('express');
const router = express.Router();
const { addItem } = require('../models/item');
const { addStory } = require('../models/story');
const { addMedia } = require('../models/media');

// Страница добавления персонажа или артефакта
router.get('/add-item', (req, res) => {
    res.render('add-item', {
        pageTitle: 'Добавить Персонажа или Артефакт'
    });
});

// Обработка формы добавления персонажа или артефакта
router.post('/add-item', async (req, res) => {
    const { title, description, category } = req.body;
    try {
        await addItem(title, description, category);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Ошибка при добавлении элемента в базу данных');
    }
});

// Страница добавления истории
router.get('/add-story', (req, res) => {
    res.render('add-story', {
        pageTitle: 'Добавить Историю'
    });
});

// Обработка формы добавления истории
router.post('/add-story', async (req, res) => {
    const { title, content, relatedItems } = req.body;
    try {
        await addStory(title, content, relatedItems);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Ошибка при добавлении истории в базу данных');
    }
});

// Страница добавления иллюстрации или видео
router.get('/add-media', (req, res) => {
    res.render('add-media', {
        pageTitle: 'Добавить Иллюстрацию или Видео'
    });
});

// Обработка формы добавления иллюстрации или видео
router.post('/add-media', async (req, res) => {
    const { filename, relatedItems } = req.body;
    try {
        await addMedia(filename, relatedItems);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Ошибка при добавлении медиа в базу данных');
    }
});

module.exports = router;
