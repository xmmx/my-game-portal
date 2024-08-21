
const express = require('express');
const path = require('path');
const fs = require('fs');
const { createTable: createItemTable } = require('./models/item');
const { createTable: createStoryTable } = require('./models/story');
const { createTable: createMediaTable } = require('./models/media');
const { createTable: createRatingTable } = require('./models/rating');
const app = express();

// Ensure the database directory exists
const dbDir = path.join(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

const mainRoutes = require('./routes/main');
const contentRoutes = require('./routes/content');
const ratingRoutes = require('./routes/rating');
const analyticsRoutes = require('./routes/analytics');
app.use(mainRoutes);
app.use(contentRoutes);
app.use(ratingRoutes);
app.use(analyticsRoutes);

// Create tables in the database when the application starts
createItemTable();
createStoryTable();
createMediaTable();
createRatingTable();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
