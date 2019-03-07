/**
 * @fileoverview translator
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 04.05.2018
 * @description RENDERER to translate the Textkeys from the pages, load the right key
 * @module app/renderer/translator.js
 */

module.exports = translator;
const $ = require("jquery");

/**
 * @description main Function for Translator
 */
function translator() {}

/**
 * @description GLOBAL FUNCTION if switch Page: Load the Translated Texts
 */
translator.prototype.loadLanguageKeys = function(page) {
    switch (page) {
        case "mainPage":
            mainPage();
            break;
        case "entryPage":
            entryPage();
            break;
        default:
            break;
    }
};
function mainPage() {
    $("#revenueTitle").text(I18N.__("mainPage", "revenueTitle"));
    $("#expensesTitle").text(I18N.__("mainPage", "expensesTitle"));
}

function entryPage() {
    $("#newNameLabel").text(I18N.__("entryPage", "newNameLabel"));
    $("#entryTitle").text(I18N.__("entryPage", typ));
    $("#newAmountLabel").text(I18N.__("entryPage", "newAmountLabel"));
    $("#newCategoryLabel").text(I18N.__("entryPage", "newCategoryLabel"));
    $("#newPeriodStartLabel").text(I18N.__("entryPage", "newPeriodStartLabel"));
    $("#newPeriodEndLabel").text(I18N.__("entryPage", "newPeriodEndLabel"));
    $("#newIntervalLabel").text(I18N.__("entryPage", "newIntervalLabel"));

    document.getElementById("saveBtn").innerHTML += " " + I18N.__("entryPage", "saveBtn");
    document.getElementById("closeBtn").innerHTML += " " + I18N.__("entryPage", "closeBtn");
}
