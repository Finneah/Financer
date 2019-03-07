/**
 * @fileoverview CLASSES/MAINPAGE
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 29.04.2018
 * @description CLASS for MAINPAGE
 * @module app/classes/MainPage.js
 */
module.exports = NEW_MAINPAGE;

/**
 * @description Main Function to init this Module
 */
function NEW_MAINPAGE() {}

/**
 * @description return the Class Entry
 * @returns {class} Entry
 */
NEW_MAINPAGE.prototype.createClassMainPage = () => {
    return MainPage;
};
/**
 * @description class for MainPage Elements
 */
class MainPage {
    /**
     * @class MainPage
     * @param {string} selectedYear
     * @param {string} months
     */
    constructor(selectedYear, months) {
        this.selectedYear = {
            selectedYearInnerHTML: selectedYear.innerHTML,
            selectedYearDiv: selectedYear
        };

        this.setSelectedYear = (element, year) => {
            element ? (this.selectedYear.selectedYearDiv = element) : null;
            if (year) {
                if (this.checkMinMaxYear(year)) {
                    this.selectedYear.selectedYearInnerHTML = year;
                }
            } else {
                this.selectedYear.selectedYearInnerHTML = this.getActualDate("year");
            }
            this.selectedYear.selectedYearDiv.innerHTML = this.selectedYear.selectedYearInnerHTML;
        };
        this.getSelectedYear = () => {
            return this.selectedYear;
        };

        this.months = {
            monthsDiv: months,
            selectedElement: null,
            selectedMonth: 0
        };
        this.setSelectedMonth = (element, selectedElement) => {
            element ? (this.months.monthsDiv = element) : null;

            selectedElement ? (this.months.selectedElement = selectedElement) : null;
            selectedElement ? (this.months.selectedMonth = selectedElement.innerHTML) : null;
        };
        this.getSelectedMonth = () => {
            return this.months;
        };
    }

    /**
     * @description get the actual date if date is unset
     * @param {string} value
     */
    getActualDate(value) {
        var date = new Date();
        switch (value) {
            case "year":
                return date.getFullYear();
            case "mount":
                return date.getMonth() + 1;
            default:
                return date;
        }
    }
    /**
     * @description switch the Year on click left-Btn or right-Btn
     * @param {string} direction
     */
    switchYears(direction) {
        if (checkMinMaxYear(this.getSelectedYear.selectedYearInnerHTML)) {
            switch (direction) {
                case "left":
                    this.setSelectedYear(this.getSelectedYear.selectedYearInnerHTML - 1);
                    break;
                case "right":
                    this.setSelectedYear(this.getSelectedYear.selectedYearInnerHTML + 1);
                    break;
                default:
            }
        }
    }

    /**
     * @description check the min and max year
     * @param {int} year
     * @returns {bool}
     */
    checkMinMaxYear(year) {
        year = parseInt(year);
        if (year >= CONFIG.getYear().min && year <= CONFIG.getYear().max) {
            return true;
        }
        return false;
    }
}
