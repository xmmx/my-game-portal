
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/sqlite.db');

const createTable = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT NOT NULL
        )
    `);
};

const addItem = (title, description, category) => {
    const query = `
        INSERT INTO items (title, description, category)
        VALUES (?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.run(query, [title, description, category], function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
};

module.exports = { createTable, addItem };
