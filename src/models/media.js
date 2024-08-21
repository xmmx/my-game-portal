
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/sqlite.db');

const createTable = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS media (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            related_items TEXT
        )
    `);
};

const addMedia = (filename, relatedItems) => {
    const query = `
        INSERT INTO media (filename, related_items)
        VALUES (?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.run(query, [filename, relatedItems], function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
};

module.exports = { createTable, addMedia };
