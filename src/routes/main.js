
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Dashboard',
        dashboardData: {
            totalCharacters: 0,
            totalArtifacts: 0,
            totalStories: 0,
            totalImages: 0,
            totalVideos: 0
        },
        popularMaterials: [],
        recentMaterials: []
    });
});

module.exports = router;
