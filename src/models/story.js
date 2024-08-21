
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/sqlite.db');

const createTable = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS stories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            related_items TEXT
        )
    `);
};

const addStory = (title, content, relatedItems) => {
    const query = `
        INSERT INTO stories (title, content, related_items)
        VALUES (?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.run(query, [title, content, relatedItems], function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
};

module.exports = { createTable, addStory };
