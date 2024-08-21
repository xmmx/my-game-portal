
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/sqlite.db');

const createTable = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            content_id INTEGER,
            content_type TEXT,
            rating INTEGER,
            UNIQUE(user_id, content_id, content_type)
        )
    `);
};

const addRating = (userId, contentId, contentType, rating) => {
    const query = `
        INSERT OR REPLACE INTO ratings (user_id, content_id, content_type, rating)
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.run(query, [userId, contentId, contentType, rating], function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
};

const getRating = (contentId, contentType) => {
    const query = `
        SELECT SUM(rating) as totalLikes FROM ratings
        WHERE content_id = ? AND content_type = ?
    `;
    return new Promise((resolve, reject) => {
        db.get(query, [contentId, contentType], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row.totalLikes || 0);
        });
    });
};

module.exports = { createTable, addRating, getRating };
