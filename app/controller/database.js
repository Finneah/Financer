/**
 * @fileoverview DATABASE
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 22.03.2018
 * @description CONTROLLER for DATABASE, create dbs and tables. Controll statements
 * @module app/controller/database.js
 */

module.exports = DATABASE;
const electron = require('electron');
const app = electron.app ? electron.app : electron.remote.app;
const path = require('path');
const appPath = path.resolve(app.getAppPath() + '/../../');
const userDataPath = path.resolve(app.getPath('userData'));
const fs = require('fs');
const is = require('electron-is');
const dbPath = checkedDBPath();
console.log(dbPath);
const configDBPath = dbPath.replace('financer.db', 'appConfig.db');

const Database = require('better-sqlite3');
/**
 * @description Main Function to init this Modul
 */
function DATABASE() {
    createConfigDB();
}

/**
 * @description GLOBAL FUNCTION for createDB()
 */
DATABASE.prototype.createDB = () => {
    createDB();
};
/**
 * @description create revenue DB if not exists
 */
function createDB() {
    try {
        var db = new Database(dbPath);
        var create =
            'CREATE TABLE IF NOT EXISTS `entrys` (' +
            '`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
            '`name`	TEXT NOT NULL,' +
            '`amount`	REAL NOT NULL,' +
            '`category`	TEXT,' +
            '`typ`	TEXT NOT NULL,' +
            '`intervalId`	INTEGER NOT NULL,' +
            '`periodFrom`	TEXT NOT NULL,' +
            '`periodTill`	TEXT);';
        var stmt = db.prepare(create);
        stmt.run();
        db.close();
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description GLOBAL FUNCTION for getEntrys()
 * @param {int} year
 * @returns {object} entrys
 */
DATABASE.prototype.getEntrys = function(year) {
    return getEntrys(year);
};

/**
 * @description get Entrys and return them
 * @param {int} year
 * @returns {array} entrys
 */
function getEntrys(year) {
    try {
        var db = new Database(dbPath);
        var get = 'SELECT * FROM entrys ORDER BY name ASC';
        var stmt = db.prepare(get);
        var all = stmt.all();
        db.close();
        return all;
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description GLOBAL FUNCTION for saveEntry()
 * @param {array} entry
 */
DATABASE.prototype.saveEntry = entry => {
    if (entry.id != null) {
        return updateEntry(entry);
    } else {
        return saveEntry(entry);
    }
};

/**
 * @description save the Entrys in DB
 * @param {array} entry
 */
function saveEntry(entry) {
    try {
        var db = new Database(dbPath);
        var insert =
            'INSERT INTO entrys VALUES (null, @name, @amount, @category,@typ,@intervalId,@periodFrom,@periodTill);';
        var stmt = db.prepare(insert);

        var insertEntry = stmt.run({
            name: entry.name,
            amount: entry.amount,
            category: entry.category.className,
            typ: entry.typ,
            intervalId: entry.interval,
            periodFrom: entry.period.from,
            periodTill: entry.period.till
        });
        db.close();
        return insertEntry;
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description update the selected Entry
 * @param {object} entry
 */
function updateEntry(entry) {
    try {
        var db = new Database(dbPath);

        var update =
            'UPDATE entrys SET name=@name, amount=@amount, category=@category,typ=@typ,intervalId=@intervalId,periodFrom=@periodFrom,periodTill=@periodTill WHERE id=@id;';
        var stmt = db.prepare(update);

        var updateEntry = stmt.run({
            name: entry.name,
            amount: entry.amount,
            category: entry.category.className,
            typ: entry.typ,
            intervalId: entry.interval,
            periodFrom: entry.period.from,
            periodTill: entry.period.till,
            id: entry.id
        });
        db.close();
        return updateEntry;
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description GLOBAL FUNCTION for deleteEntry()
 * @param {int} id
 * @returns {bool} deleted
 */
DATABASE.prototype.deleteEntry = id => {
    return deleteEntry(id);
};

/**
 * @description delete an Entry
 * @param {int} id
 * @returns {bool} deleted
 */
function deleteEntry(id) {
    try {
        createDB();
        var db = new Database(dbPath);

        var deleteEntry = 'DELETE FROM entrys WHERE id=@id;';
        var stmt = db.prepare(deleteEntry);
        var result = stmt.run({
            id: id
        });
        db.close();
        if (result.changes > 0) {
            return true;
        }
        return false;
    } catch (error) {}
}

/**
 * @description create the Config DB if not exists
 */
function createConfigDB() {
    try {
        var db = new Database(configDBPath);
        var create =
            'CREATE TABLE IF NOT EXISTS `config` (' +
            '`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
            '`code`	TEXT NOT NULL,' +
            '`isActive`	INT NOT NULL);';

        var stmt = db.prepare(create);
        stmt.run();
        var configs = getConfigs();
        if (configs.length == 0) {
            createConfigs();
        }
        db.close();
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description GLOBAL FUNCTION for getConfigs()
 */
DATABASE.prototype.getConfigs = () => {
    return getConfigs();
};
/**
 * @description get the Configs from configDB
 */
function getConfigs() {
    try {
        var db = new Database(configDBPath);
        var get = 'SELECT * FROM config';
        var stmt = db.prepare(get);
        var all = stmt.all();
        db.close();
        return all;
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description create the Configs
 */
function createConfigs() {
    var db = new Database(configDBPath);
    var insert = 'INSERT INTO config VALUES (null, @code, @isActive);';
    var stmt = db.prepare(insert);
    var insertEntry = stmt.run({
        code: 'FIRSTSTART',
        isActive: 1
    });
    var insertEntry = stmt.run({
        code: 'TUTORIAL',
        isActive: 1
    });
    db.close();
}

/**
 * @description check DB Path for WIN and MAC
 */
function checkedDBPath() {
    createDBPath();
    if (is.dev()) {
        return './app/database/financer.db';
    } else {
        switch (process.platform) {
            case 'darwin':
                return appPath + '/database/financer.db';
            case 'win32':
                return userDataPath + '/database/financer.db';
            default:
                break;
        }
    }
}

/**
 * @description create the DB Paths for WIN and MAC
 */
function createDBPath() {
    if (!is.dev()) {
        switch (process.platform) {
            case 'darwin':
                if (!fs.existsSync(appPath + '/database')) {
                    fs.mkdirSync(appPath + '/database');
                }
                break;
            case 'win32':
                if (!fs.existsSync(userDataPath + '/database')) {
                    fs.mkdirSync(userDataPath + '/database');
                }
                break;

            default:
                break;
        }
    }
}
