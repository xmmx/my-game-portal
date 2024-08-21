
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/sqlite.db');

const trackActivity = (userId, actionType, contentId, contentType) => {
    const query = `
        INSERT INTO activity_log (user_id, action_type, content_id, content_type, timestamp)
        VALUES (?, ?, ?, ?, datetime('now'))
    `;
    db.run(query, [userId, actionType, contentId, contentType]);
};

const getPopularContent = (contentType) => {
    const query = `
        SELECT content_id, COUNT(*) as activityCount 
        FROM activity_log
        WHERE content_type = ?
        GROUP BY content_id
        ORDER BY activityCount DESC
        LIMIT 10
    `;
    return new Promise((resolve, reject) => {
        db.all(query, [contentType], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = { trackActivity, getPopularContent };
