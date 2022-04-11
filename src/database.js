const sqlite = require('better-sqlite3');
const db = new sqlite('./database.sqlite');
exports.db = db;

// FUNCTIONS 
exports.getAgent = () => {
    const sql = "SELECT * FROM Agent";
    let stmt = db.prepare(sql);
    return stmt.all();
}