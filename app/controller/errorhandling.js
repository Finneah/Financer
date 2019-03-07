/**
 * @fileoverview ERRORHANDLING
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 04.05.2018
 * @description CONTROLLER for ERRORHANDLING, write logfile and show errorMessageBox
 * @module app/controller/errorhandling.js
 */
module.exports = ERRORHANDLING;
const electron = require("electron");
const app = electron.app ? electron.app : electron.remote.app;
const remote = electron.remote;
const main = remote.require("../controller/app.js");
const fs = require("fs");
const is = require("electron-is");
const path = require("path");

/**
 * @description main Function for ERRORHANDLING
 */
function ERRORHANDLING() {}

/**
 * @description GLOBAL FUNCTION handle the Errors
 * @param {string} msg the Error_message
 */
ERRORHANDLING.prototype.handleError = function(err = "", msg = "") {
    if (is.dev()) {
        console.log(err);
    }
    showErrorDialog(err, msg);
};

/**
 * @description show an Error-Dialog
 * @param {object} err
 * @param {string} msg the Error_message
 */
function showErrorDialog(err, msg) {
    var text = "";
    if (err.stack) {
        text += err.code + "\n" + err.message + "\n" + err.stack;
    } else {
        if (msg.match("ECONNREFUSED") || msg.match("ECONNRESET")) {
            msg = I18N.__("error", "ECONNREFUSED");
        }
        text = I18N.__("error", msg);
        text += "\n";
    }
    var BrowserWindow = remote.BrowserWindow;
    win = BrowserWindow.getFocusedWindow();
    main.showMessageDialog(win,I18N.__("error", "errorTitle"), text, "error");
}

/**
 * @description GLOBAL FUNCTION for log()
 * @deprecated NOT IMPLEMENTET YET
 * @param {string} msg the Error_message
 */
ERRORHANDLING.prototype.log = function(msg) {
    log(msg);
};

/**
 * @description write Log_File
 * @param {string} msg the Error_message
 */
function log(msg) {
    if (!is.dev()) {
        if (!fs.existsSync(app.getPath("userData") + "\\log")) {
            fs.mkdirSync(app.getPath("userData") + "\\log");
        }
        var logPath = path.resolve(app.getPath("userData") + "\\log");
    } else {
        var logPath = "./log";
    }
    var logFileName = "LOG_" + getCurrentTime(false) + ".log";
    var message = "";
    msg.stack != undefined ? (message = msg.stack) : (message = msg);
    fs.open(logPath + "/" + logFileName, "a", 666, function(e, id) {
        fs.write(id, getCurrentTime(false) + "\r\n" + message + "\r\n\r\n", null, "utf8", function() {
            fs.close(id, function(id) {});
        });
    });
}

/**
 * @description return currentTime
 * @param {bool} complete
 * @returns {date} datetime
 */
function getCurrentTime(complete = true) {
    var currentDate = new Date();
    var currentMount = currentDate.getMonth() + 1;
    var date =
        (currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate()) +
        "." +
        (currentMount < 10 ? "0" + currentMount : currentMount) +
        "." +
        currentDate.getFullYear();
    var timeDate =
        (currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours()) +
        ":" +
        (currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()) +
        ":" +
        (currentDate.getSeconds() < 10 ? "0" + currentDate.getSeconds() : currentDate.getSeconds());

    var fulldate = date + " " + timeDate;
    return complete ? fulldate : date;
}
