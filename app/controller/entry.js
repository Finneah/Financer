/**
 * @fileoverview ENTRY
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 22.03.2018
 * @description CONTROLLER for ENTRY, create dbs and tables. Controll statements
 * @module app/controller/entry.js
 */

module.exports = ENTRY;
const electron = require("electron");
const app = electron.app ? electron.app : electron.remote.app;
const remote = electron.remote;
const { ipcRenderer } = require("electron");
typ = "";

CLASS_CATEGORY = new (require("./../classes/Category"))();
NEW_CATEGORY = window.CLASS_CATEGORY.createClassCategory();
CLASS_ENTRY = new (require("./../classes/Entry"))();
NEW_ENTRY = CLASS_ENTRY.createClassEntry();
const DATABASE = new (require("./database.js"))();
/**
 * @description Main Function when init Modul
 */
function ENTRY() {}

/**
 * @description GLOBAL FUNCTION prepare the Page
 */
ENTRY.prototype.initEntryWindow = () => {
    try {
        var BrowserWindow = remote.BrowserWindow;
        wins = BrowserWindow.getAllWindows();
        wins.forEach(win => {
            if (win.isModal()) {
                attr = JSON.parse(win.getTitle());
                typ = attr.typ;
                year = attr.year;
                month = attr.month;
                attr.selectedEntry != undefined ? (SELECTEDENTRY = attr.selectedEntry) : (SELECTEDENTRY = null);
                attr.selectedEntry != undefined ? (SELECTEDCATEGORY = attr.selectedEntry.category) : (SELECTEDCATEGORY = "");
            }
        });
        CATEGORYS = new NEW_CATEGORY();
        CATEGORYS.setIcons();
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
};

/**
 * @description close the newEntryWindow and refesh MainWindow
 */
function close() {
    try {
        const electron = require("electron");
        const remote = electron.remote;
        var BrowserWindow = remote.BrowserWindow;
        wins = BrowserWindow.getAllWindows();
        wins[1].reload();
        wins[0].close();
    } catch (error) {
        throw error;
    }
}
/**
 * @description GLOABEL FUNCTION for saveEntry()
 * @param {object} entry
 */
ENTRY.prototype.saveEntry = entry => {
    saveEntry(entry);
};

/**
 * @description prepareEntrys to save in DB
 * @param {Object} entry
 */
function saveEntry(entry) {
    try {
        var newEntry = createNewEntry(entry);
        if (DATABASE.saveEntry(newEntry)) {
            let Data = {
                year: year,
                month: month
            };
            ipcRenderer.send("request-update-year-in-main-window", Data);
            ENTRYPAGE.close();
        } else {
            //error zeigen
        }
    } catch (error) {
        throw error;
    }
}

ENTRY.prototype.deleteEntry = entryId => {
    if (DATABASE.deleteEntry(entryId)) {
        MAINPAGE.deleteElement(entryId);
    }
};

/**
 * @description create a new Entry Object from ENtry class
 * @param {object} entry
 */
function createNewEntry(entry) {
    entry.amount = parseFloat(entry.amount);
    return new NEW_ENTRY(entry);
}

/**
 *@description GLOBAL FUNCTION load the Entrys from DB
 * @param {string} year
 * @param {string} month
 */
ENTRY.prototype.loadEntrys = year => {
    //entrys = new ENTRY.....
    try {
        var entrys = DATABASE.getEntrys(parseInt(year));
        var loadedEntrys = [];
        entrys.forEach(entry => {
            entry.from = entry.periodFrom;
            entry.till = entry.periodTill;
            if (checkFromTill(entry)) {
                loadedEntrys.push(new NEW_ENTRY(entry));
            }
        });
        return loadedEntrys;
    } catch (error) {
        throw error;
    }
};

/**
 * @description check from and till for the interval
 * @param {object} entry
 */
function checkFromTill(entry) {
    var year = MAINPAGE_ELEMENTS.getSelectedYear().selectedYearInnerHTML;
    var month = MAINPAGE_ELEMENTS.getSelectedMonth().selectedMonth;
    var date = new Date(year, CONFIG.getMonths()[month], 0);
    var from = new Date(entry.from);

    var dateMonth = date.getMonth() + 1;
    var till = new Date(entry.till);
    if (entry.intervalId == 0) {
        if (date.getFullYear() == from.getFullYear() && date.getMonth() + 1 == from.getMonth() + 1) {
            return true;
        }
    } else {
        if (date >= from && date <= till) {
            if (dateMonth == from.getMonth() + 1 && date.getFullYear() == from.getFullYear()) {
                return true;
            }
            switch (entry.intervalId) {
                case 1:
                    return true;
                case 12:
                    if (dateMonth == from.getMonth() + 1) {
                        if (date.getFullYear() >= from.getFullYear() && date.getFullYear() <= till.getFullYear()) {
                            return true;
                        }
                    }

                default:
                    return calcShowMonth(entry.intervalId, 12 - (from.getMonth() + 1), dateMonth, from);
                    break;
            }
        }
    }
    return false;
}

function test(interval, repeat, dateMonth) {
    for (var j = 0; j < 12; j++) {
        showMod(interval, repeat, j);
    }
}
/**
 * @description calc show Entry in Month
 * @param {interval} interval
 * @param {interval} repeat
 * @param {int} dateMonth
 * @returns {bool}
 */
function calcShowMonth(interval, repeat, dateMonth, from) {
    for (var i = 0; i <= repeat; i++) {
        var checksum = from.getMonth() + 1 < dateMonth ? from.getMonth() + 1 : 1;
        if (i % interval == 0 && i + checksum == dateMonth) {
            return true;
        }
    }
    return false;
}

/**
 * @description GLOBAL FUNCTION for round()
 * @param {float} wert
 */
ENTRY.prototype.round = wert => {
    return round(wert);
};

/**
 *@description round wert to dezimal with 2
 * @param {float} wert
 */
function round(wert) {
    wert = parseFloat(wert);
    if (!wert) return 0;
    var umrechnungsfaktor = Math.pow(10, 2);
    return Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor;
}
