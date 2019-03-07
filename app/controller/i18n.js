/**
 * @fileoverview I18N
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 04.05.2018
 * @description controller process to load and switch the language and load the keys
 * @module app/controller/i18n.js
 */
module.exports = I18N;
const path = require("path");
const electron = require("electron");
const fs = require("fs");
let loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app;

/**
 * @description main Function for I18N
 */
function I18N() {
    try {
        if (app.getLocale() == "de") {
            loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, "/../resources/language/de.json"), "utf8"));
        } else {
            loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, "/../resources/language/en.json"), "utf8"));
        }
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description check the Loaded Language
 * @param {string} key categorie
 * @param {string} phrase textkey
 * @returns {string} translation
 */
I18N.prototype.__ = function(key, phrase) {
    try {
        let translation = loadedLanguage[key][phrase];
        if (translation === undefined) {
            translation = phrase;
        }
        return translation;
    } catch (error) {
        throw error;
    }

    
};

/**
 * @description switch the Language
 * @deprecated NOT IN USE
 */
I18N.prototype.switchLang = function(lang) {
    try {
        switch (lang) {
            case "de":
                loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, "/../resources/language/de.json"), "utf8"));
                break;
            case "en":
                loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, "/../resources/language/en.json"), "utf8"));
                break;
            default:
                loadedLanguage = JSON.parse(
                    fs.readFileSync(path.join(__dirname, "/../resources/language/" + app.getLocale() + ".json"), "utf8")
                );
                break;
        }
    } catch (error) {
        throw err;
    }
};
