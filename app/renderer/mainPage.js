/**
 * @fileoverview MAINPAGE
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 02.05.2018
 * @description RENDERER for MAINPAGE
 * @module app/renderer/mainPage.js
 */
module.exports = MAINPAGE;
const electron = require("electron");
const app = electron.app ? electron.app : electron.remote.app;
const remote = electron.remote;
const { ipcRenderer } = require("electron");
const CLASS_MAINPAGE = new (require("./../classes/MainPage"))();
NEW_MAINPAGE = CLASS_MAINPAGE.createClassMainPage();

/**
 * @description Main Function to init this Modul
 */
function MAINPAGE() {}
/**
 * @description GLABAL FUNCTION for preparePage()
 */
MAINPAGE.prototype.preparePage = () => {
    preparePage();
};
/**
 * @description create Elements, add Events,load Entrys
 */
function preparePage() {
    try {
        MAINPAGE_ELEMENTS = new NEW_MAINPAGE(document.getElementById("year"));
        selectYear();
        createMonths();
        addEvents();
        calculate();
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description set the selected Year
 */
function selectYear() {
    MAINPAGE_ELEMENTS.setSelectedYear();
}
/**
 * @description create the Elements for Months
 */
function createMonths() {
    try {
        var months = document.getElementById("months");
        for (var i = 1; i <= 12; i++) {
            var el = document.createElement("div");
            el.className = "col text-center monthsCol";
            el.innerHTML = I18N.__("mainPage", "month_" + i);
            el.id = "Month[" + i + "]";

            if (i == new Date().getMonth() + 1) {
                loadMonth(el);
            }
            months.appendChild(el);
        }
        for (var i = 0; i < months.childElementCount; i++) {
            months.children[i].addEventListener("click", el => {
                var months = document.getElementById("months");
                for (var i = 0; i < months.childElementCount; i++) {
                    months.children[i].classList.remove("active-month");
                }
                loadMonth(el.currentTarget);
                calculate();
            });
        }
    } catch (error) {
        throw error;
    }
}
/**
 * @description load entry for selected Month
 * @param {object} elem selectedElem
 */
function loadMonth(elem) {
    try {
        MAINPAGE_ELEMENTS.setSelectedMonth(document.getElementById("months"), elem);
        elem.classList.add("active-month");
        createEntryElements(loadEntrys(MAINPAGE_ELEMENTS.getSelectedYear().selectedYearInnerHTML));
    } catch (error) {
        throw error;
    }
}
/**
 * @description addEvents for last Year and next Year
 */
function addEvents() {
    try {
        document.getElementById("lastYearBtn").addEventListener("click", () => {
            MAINPAGE_ELEMENTS.setSelectedYear(false, parseInt(MAINPAGE_ELEMENTS.getSelectedYear().selectedYearInnerHTML) - 1);
            createEntryElements(loadEntrys(MAINPAGE_ELEMENTS.getSelectedYear().selectedYearInnerHTML));
            calculate();
        });
        document.getElementById("nextYearBtn").addEventListener("click", () => {
            MAINPAGE_ELEMENTS.setSelectedYear(false, parseInt(MAINPAGE_ELEMENTS.getSelectedYear().selectedYearInnerHTML) + 1);
            createEntryElements(loadEntrys(MAINPAGE_ELEMENTS.getSelectedYear().selectedYearInnerHTML));
            calculate();
        });

        document.getElementById("newRevenue").addEventListener("click", () => {
            showNewEntryWindow("revenue");
        });

        document.getElementById("newExpenses").addEventListener("click", () => {
            showNewEntryWindow("expenses");
        });
    } catch (error) {
        throw error;
    }
}

/**
 * @description calculate the overview
 */
function calculate() {
    var entrys = [];
    var expensesSum = calculateExpenses();
    var revenueSum = calculateRevenues();
    var rest = CONTROLLER_ENTRY.round(revenueSum - expensesSum).toString();
    rest.substr(rest.indexOf("."), rest.length).length == 2 ? (rest += 0) : null;
    var calc = {
        revenue: { name: I18N.__("mainPage", "revenueTitle"), amount: revenueSum },
        expenses: { name: I18N.__("mainPage", "expensesTitle"), amount: expensesSum },
        overview: { name: I18N.__("mainPage", "restTitle"), amount: rest }
    };
    for (var key in calc) {
        if (calc.hasOwnProperty(key)) {
            var entry = {
                name: calc[key].name,
                amount: calc[key].amount,
                typ: "overview"
            };
            entrys.push(entry);
        }
    }

    createEntryElements(entrys, true);
    updateProgressBar(calc);
}

/**
 * @description calculate the Expenses
 */
function calculateExpenses() {
    var expenses = expensesEntrys();
    var expensesSum = 0;
    for (var i = 0; i < expenses.length; i++) {
        var entry = expenses[i];
        for (var j = 0; j < entry.childElementCount; j++) {
            var child = entry.children[j];
            if (child.classList.contains("amount")) {
                var value = child.children[0].innerHTML.substr(0, child.children[0].innerHTML.length - 2);
                expensesSum += parseFloat(value);
            }
        }
    }
    return expensesSum;
}

/**
 * @description calculate the Revenues
 */
function calculateRevenues() {
    var revenues = revenueEntrys();
    var revenueSum = 0;
    for (var i = 0; i < revenues.length; i++) {
        var entry = revenues[i];
        for (var j = 0; j < entry.childElementCount; j++) {
            var child = entry.children[j];
            if (child.classList.contains("amount")) {
                var value = child.children[0].innerHTML.substr(0, child.children[0].innerHTML.length - 2);
                revenueSum += parseFloat(value);
            }
        }
    }
    return revenueSum;
}

/**
 * @description get all Revenue Elements
 */
function revenueEntrys() {
    var children = [];
    var entrys = document.getElementsByClassName("revenueEntry");
    for (var i = 0; i < entrys.length; i++) {
        if (entrys.hasOwnProperty(i)) {
            var entry = entrys[i];
            children.push(entry);
        }
    }
    return children;
}

/**
 * @description get all Expenses Elements
 */
function expensesEntrys() {
    var children = [];
    var entrys = document.getElementsByClassName("expensesEntry");
    for (var i = 0; i < entrys.length; i++) {
        if (entrys.hasOwnProperty(i)) {
            var entry = entrys[i];
            children.push(entry);
        }
    }
    return children;
}
/**
 * @description load the Entrys from DB for selected Year and Month
 * @param {string} year
 */
function loadEntrys(year) {
    try {
        return CONTROLLER_ENTRY.loadEntrys(year);
    } catch (error) {
        throw error;
    }
}

/**
 * @description create a New Window (Sheet on Mac) to create a New Entry or edit a selected entry
 * @param {string} typ revenue or expenses
 */
function showNewEntryWindow(typ, selectedEntry) {
    try {
        var BrowserWindow = remote.BrowserWindow;
        if ((BrowserWindow.getAllWindows().length = 1)) {
            let entryData = {
                typ: typ,
                year: MAINPAGE_ELEMENTS.getSelectedYear().selectedYearInnerHTML,
                month: MAINPAGE_ELEMENTS.getSelectedMonth().selectedMonth,
                selectedEntry: selectedEntry
            };
            ipcRenderer.send("give-year-to-second-window", JSON.stringify(entryData));
        }
    } catch (error) {
        throw error;
    }
}

/**
 * @description create a New Window (Sheet on Mac) to delete the selected entry
 * @param {string} typ revenue or expenses
 * @param {object} selectedEntry
 */
function showDeleteEntryWindow(typ, selectedEntry) {
    try {
        const remote = require("electron").remote;
        remote.dialog.showMessageBox(
            {
                type: "warning",
                title: selectedEntry.name + " " + I18N.__("mainPage", "deleteEntryTitle"),
                message: I18N.__("mainPage", "deleteEntryText"),
                buttons: [I18N.__("global", "cancel"), I18N.__("global", "delete")],
                noLink: false
            },
            function(buttonIndex) {
                buttonIndex == 1 ? CONTROLLER_ENTRY.deleteEntry(selectedEntry.id) : null;
            }
        );
    } catch (error) {
        throw error;
    }
}

/**
 * @description clear the Grid when switch Month or Year
 * @param {bool} onlyOverview
 */
function clearGrid(onlyOverview = false) {
    try {
        var revenue = document.getElementById("revenueUl");
        var expenses = document.getElementById("expensesUl");
        var overview = document.getElementById("overviewUl");
        if (!onlyOverview) {
            while (revenue.childElementCount != 0) {
                revenue.removeChild(revenue.lastElementChild);
            }
            while (expenses.childElementCount != 0) {
                expenses.removeChild(expenses.lastElementChild);
            }
        }

        while (overview.childElementCount != 0) {
            overview.removeChild(overview.lastElementChild);
        }
    } catch (error) {
        throw error;
    }
}

/**
 * @description create Elements for the Entrys
 * @param {object} entry
 * @param {bool} clearOnlyOverview
 */
function createEntryElements(entrys, clearOnlyOverview = false) {
    try {
        clearGrid(clearOnlyOverview);
        entrys.forEach(entry => {
            var li = createLi(entry);
            li.appendChild(createEntryRow(createCategoryCol(entry), entry));
            switch (entry.typ) {
                case "revenue":
                    li.classList.add("revenueLi");
                    document.getElementById("revenueUl").appendChild(li);
                    break;
                case "expenses":
                    li.classList.add("expensesLi");
                    document.getElementById("expensesUl").appendChild(li);
                    break;
                case "overview":
                    li.classList.add("overviewLi");
                    document.getElementById("overviewUl").appendChild(li);
                    break;
                default:
            }
        });
    } catch (error) {
        throw error;
    }
}
/**
 * @description create a Li Object
 * @param {object} entry
 * @returns {object} li
 */
function createLi(entry) {
    var li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    if (entry.typ != "overview") {
        li.addEventListener("dblclick", el => {
            prepareNewEntry(entry, el);
            showNewEntryWindow(entry.typ, selectedEntry);
        });
        li.addEventListener("contextmenu", el => {
            prepareNewEntry(entry, el);
            showDeleteEntryWindow(entry.typ, selectedEntry);
        });
    }

    return li;
}

/**
 * @description create a Category  Div with class Col
 * @param {object} entry
 * @returns {object} categoryCol
 */
function createCategoryCol(entry) {
    var categoryCol = document.createElement("div");
    categoryCol.className = "col-sm-1";
    if (entry.category != undefined) {
        var categorieI = document.createElement("i");
        categorieI.className = entry.category.className;
        categoryCol.appendChild(categorieI);
    }

    return categoryCol;
}

/**
 * @description create a Entry Div with class row
 * @param {object} categorieCol
 * @param {object} entry
 * @returns {object} row
 */
function createEntryRow(categoryCol, entry) {
    var descriptionCol = document.createElement("div");
    descriptionCol.className = "col";
    descriptionCol.innerHTML = entry.name;
    var amount = document.createElement("div");
    amount.className = "text-right";
    var wert = CONTROLLER_ENTRY.round(entry.amount).toString();
    wert.substr(wert.indexOf("."), wert.length).length == 2 ? (wert += 0) : null;
    amount.innerHTML = wert + " " + CONFIG.getCurrency();
    var amountCol = document.createElement("div");
    amountCol.className = "col amount";
    amountCol.appendChild(amount);

    var emptyCol = document.createElement("div");
    emptyCol.className = "col-sm-1";
    var row = document.createElement("div");
    row.className = "row" + " " + entry.typ + "Entry";
    row.id = "Entry[" + entry.id + "]";
    row.appendChild(categoryCol);
    row.appendChild(descriptionCol);
    row.appendChild(amountCol);
    row.appendChild(emptyCol);
    return row;
}

/**
 * @description prepare the new Entry Element
 * @param {object} entry
 * @param {object} el
 */
function prepareNewEntry(entry, el) {
    changeActiveEntry(document.getElementById("expensesUl"), el);
    changeActiveEntry(document.getElementById("revenueUl"), el);

    selectedEntry = {
        id: entry.id,
        category: entry.category.className,
        name: entry.name,
        amount: entry.amount,
        interval: entry.interval,
        period: entry.period
    };
}

/**
 * @description update the ProgressBar
 * @param {object} elements
 */
function updateProgressBar(elements) {
    try {
        clearProgress();
        var progress = document.getElementById("progressOverview");
        var progressExpenses = document.createElement("div");
        var progressRevenue = document.createElement("div");

        progressRevenue.className = "progress-bar success";

        progressRevenue.innerHTML = I18N.__("mainPage", "revenueTitle");
        progressExpenses.innerHTML = I18N.__("mainPage", "restTitle");
        var wertR = CONTROLLER_ENTRY.round(elements.revenue.amount).toString();
        wertR.substr(wertR.indexOf("."), wertR.length).length == 2 ? (wertR += 0) : null;

        var wertO = CONTROLLER_ENTRY.round(elements.overview.amount).toString();
        wertO.substr(wertO.indexOf("."), wertO.length).length == 2 ? (wertO += 0) : null;

        var wertE = CONTROLLER_ENTRY.round(elements.expenses.amount).toString();
        wertE.substr(wertE.indexOf("."), wertE.length).length == 2 ? (wertE += 0) : null;
        
        if (elements.revenue.amount && !elements.expenses.amount) {
            progressRevenue.style.width = 100 + "%";
            progressRevenue.innerHTML = wertR + " €";
            progress.appendChild(progressRevenue);
        } else if (elements.expenses.amount && !elements.revenue.amount) {
            progressExpenses.style.width = 100 + "%";
            progressExpenses.className = "progress-bar danger";
            progressExpenses.innerHTML = wertE + " €";
            progress.appendChild(progressExpenses);
        } else if (elements.revenue.amount && elements.expenses.amount) {
            var percent = elements.expenses.amount * 100 / elements.revenue.amount;
            if (percent > 90) {
                progressExpenses.className = "progress-bar danger";
            } else {
                progressExpenses.className = "progress-bar warning";
            }
            progressExpenses.style.width = percent + "%";
            progressExpenses.innerHTML = wertE + " €";
            progressRevenue.innerHTML = wertO + " €";
            progressRevenue.style.width = 100 - percent + "%";
            progress.appendChild(progressExpenses);
            progress.appendChild(progressRevenue);
        }
    } catch (error) {
        throw error;
    }
}

/**
 * @description clear the PRogressBar
 */
function clearProgress() {
    var progress = document.getElementById("progressOverview");
    while (progress.childElementCount != 0) {
        progress.removeChild(progress.lastElementChild);
    }
}

/**
 * @description change active Entry on Click the entry Element
 * @param {object} parent
 * @param {object} el
 */
function changeActiveEntry(parent, el) {
    for (var i = 0; i < parent.childElementCount; i++) {
        var child = parent.children[i];
        if (child == el.currentTarget) {
            child.classList.add("active");
        } else {
            child.classList.remove("active");
        }
    }
}

/**
 * @description delete Entry Element on rightclick
 * @param {int} id
 */
MAINPAGE.prototype.deleteElement = id => {
    try {
        var elem = document.getElementById("Entry[" + id + "]");
        elem.parentElement.remove();
        calculate();
    } catch (error) {
        throw error;
    }
};
