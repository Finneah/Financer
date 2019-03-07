/**
 * @fileoverview CLASSES/ENTRY
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 29.04.2018
 * @description CLASS for ENTRY
 * @module app/classes/Entry.js
 */
module.exports = ENTRY;
CLASS_CATEGORY = new (require("./../classes/Category"))();
NEW_CATEGORY = window.CLASS_CATEGORY.createClassCategory();

/**
 * @description Main Function to init this Modul
 */
function ENTRY() {}

/**
 * @description return the Class Entry
 * @returns {class} Entry
 */
ENTRY.prototype.createClassEntry = () => {
    return Entry;
};

/**
 * @description class Entry
 */
class Entry {
    /**
     * @class Entry
     * @param {object} entry
     */
    constructor(entry) {
        this.id = entry.id != undefined ? entry.id : null;
        this.name = entry.name;
        this.amount = entry.amount;
        this.category = new NEW_CATEGORY().getIcon(entry.category);
        this.typ = entry.typ;
        this.interval = entry.interval != undefined ? entry.interval : entry.intervalId;
        this.period = entry.period != undefined ? entry.period : { from: entry.from, till: entry.till };
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setAmount(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
    setcategory(category) {
        this.category = category;
    }
    getcategory() {
        return this.category;
    }
    setTyp(typ) {
        this.typ = typ;
    }
    getTyp() {
        return this.typ;
    }
    setInterval(interval) {
        this.interval = interval;
    }
    getInterval() {
        return this.interval;
    }
    setPeriod(period) {
        this.period = period;
    }
    getPeriod() {
        return this.period;
    }
}
