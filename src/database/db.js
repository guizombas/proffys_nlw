const Database = require("sqlite-async")

const execute = (db) =>{
    db.exec(`
    CREATE TABLE IF NOT EXISTS proffys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        whatsapp TEXT,
        bio TEXT
    );
    CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject INTEGER,
        cost TEXT,
        proffy_id INTEGER
    );
    CREATE TABLE IF NOT EXISTS classes_schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        weekday INTEGER,
        time_from INTEGER,
        time_to INTEGER,
        class_id INTEGER
    );
    `)
}

module.exports = async function(){
    const db = await Database.open(__dirname+"/database.sqlite")
    execute(db)
    return db
}()
