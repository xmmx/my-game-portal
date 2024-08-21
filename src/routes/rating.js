
const express = require('express');
const router = express.Router();
const { addRating, getRating } = require('../models/rating');

// API для добавления оценки
router.post('/rate', async (req, res) => {
    const { userId, contentId, contentType, rating } = req.body;

    try {
        await addRating(userId, contentId, contentType, rating);
        const totalLikes = await getRating(contentId, contentType);
        res.json({ success: true, totalLikes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка при добавлении оценки.' });
    }
});

module.exports = router;
