
const express = require('express');
const path = require('path');
const { createTable: createItemTable } = require('./models/item');
const { createTable: createStoryTable } = require('./models/story');
const { createTable: createMediaTable } = require('./models/media');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));

const mainRoutes = require('./routes/main');
const contentRoutes = require('./routes/content');
app.use(mainRoutes);
app.use(contentRoutes);

// Создание таблиц в базе данных при запуске приложения
createItemTable();
createStoryTable();
createMediaTable();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
