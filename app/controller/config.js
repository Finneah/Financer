/**
 * @fileoverview Config
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 02.05.2018
 * @description CONTROLLER for config
 * @module app/controller/config.js
 */
module.exports = CONFIG;

const electron = require("electron");
let app = electron.app ? electron.app : electron.remote.app;

CONFIG.year = {};
CONFIG.period = {};
CONFIG.interval = {};

/**
 * @description Main Function to init this Modul
 */
function CONFIG() {
    setConfigs();
}

/**
 * @description set the Config for interval, period and year
 */
function setConfigs() {
    CONFIG.interval = {
        0: "einmalig",
        1: "jeden Monat",
        2: "alle 2 Monate",
        3: "alle 3 Monate",
        6: "alle 6 Monate",
        12: "jährlich"
    };
    CONFIG.period = {
        min: "2015-01-01",
        max: "2030-12-31",
        format: "yyyy-mm-dd"
    };
    CONFIG.year = {
        min: 2015,
        max: 2030
    };
    CONFIG.months = {
        Jan: 1,
        Feb: 2,
        März: 3,
        March: 3,
        Apr: 4,
        Mai: 5,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Okt: 10,
        Oct: 10,
        Nov: 11,
        Dez: 12,
        Dec: 12
    };
    CONFIG.appConfig = getConfigsFromDB();
}

/**
 * @description GLOBAL FUNCTION get the interval settings
 */
CONFIG.prototype.getInterval = () => {
    return CONFIG.interval;
};

/**
 * @description GLOBAL FUNCTION get the period settings
 */
CONFIG.prototype.getPeriod = () => {
    return CONFIG.period;
};

/**
 * @description GLOBAL FUNCTION get the year settings
 */
CONFIG.prototype.getYear = () => {
    return CONFIG.year;
};

/**
 * @description GLOBAL FUNCTION get the month settings
 */
CONFIG.prototype.getMonths = () => {
    return CONFIG.months;
};

/**
 * @description GLOBAL FUNCTION convert the Date for input date
 * @param {string} year
 * @param {string} month
 * @param {string} day
 * @returns {string} date
 */
CONFIG.prototype.convertDate = (year, month, day) => {
    try {
        if (CONFIG.months.hasOwnProperty(month)) {
            month = CONFIG.months[month].toString();
        }
        parseInt(month) < 10 ? (month = 0 + month) : null;
        parseInt(day) < 10 ? (day = 0 + day) : null;
        return year + "-" + month + "-" + day;
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
};

/**
 * @description return the Currency Symbol
 */
CONFIG.prototype.getCurrency = () => {
    if (app.getLocale() == "de") {
        return "€";
    }
    return "$";
};

function getConfigsFromDB() {
    return DATABASE.getConfigs();
}
