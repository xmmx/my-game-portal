
const express = require('express');
const router = express.Router();
const { trackActivity, getPopularContent } = require('../models/analytics');

// API для получения популярных материалов
router.get('/popular/:type', async (req, res) => {
    const contentType = req.params.type;

    try {
        const popularContent = await getPopularContent(contentType);
        res.json({ success: true, popularContent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка при получении популярных материалов.' });
    }
});

module.exports = router;
