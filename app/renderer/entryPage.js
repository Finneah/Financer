/**
 * @fileoverview ENTRYPAGE
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 22.03.2018
 * @description RENDERER for ENTRYPAGE
 * @module app/renderer/entryPage.js
 */

module.exports = ENTRYPAGE;
const electron = require("electron");
const app = electron.app ? electron.app : electron.remote.app;
const remote = electron.remote;
const { ipcRenderer } = require("electron");
typ = "";
SELECTEDCATEGORY = "";
SELECTEDENTRY = "";
CLASS_ENTRY = new (require("./../classes/Entry"))();
NEW_ENTRY = window.CLASS_ENTRY.createClassEntry();
/**
 * @description Main Function when init Modul
 */
function ENTRYPAGE() {}

/**
 * @description GLOBAL FUNCTION for preparePage()
 */
ENTRYPAGE.prototype.preparePage = () => {
    CONTROLLER_ENTRY.initEntryWindow();
    preparePage();
};
/**
 * @description add Eventlistener, create Elements, prepare Values and Texts
 */
function preparePage() {
    try {
        document.getElementById("saveBtn").disabled = true;
        document.getElementById("closeBtn").addEventListener(
            "click",
            () => {
                let Data = {
                    year: year,
                    month: month
                };
                ipcRenderer.send("request-update-year-in-main-window", Data);
                close();
            },
            false
        );

        var checkValidElems = document.getElementsByClassName("checkValid");
        for (var i = 0; i < checkValidElems.length; i++) {
            var el = checkValidElems[i];
            el.addEventListener("change", el => {
                checkValidity();
            });
        }
        document.getElementById("saveBtn").addEventListener("click", () => {
            
            saveEntry();
        });

        document.getElementById("newInterval").addEventListener("change", el => {
            if (el.currentTarget.selectedIndex == 0) {
                document.getElementById("newPeriodRow").style.display = "none";
            } else {
                document.getElementById("newPeriodRow").style.display = "inline-flex";
            }
        });
        createGridCategorys(CATEGORYS.icons, 0, 0);
        createIntervalOptions();
        setStartDates();
        SELECTEDENTRY != null ? setSelectedEntry(SELECTEDENTRY) : null;
    } catch (error) {
        ERRORHANDLER.handleError(error, error.message);
    }
}

/**
 * @description check The validity from entryPage 
 */
function checkValidity() {
    document.getElementById("saveBtn").disabled = true;
    var elems = document.getElementsByClassName("checkValid");
    var checksum = elems.length;
    for (var i = 0; i < elems.length; i++) {
        el = elems[i];
        el.classList.remove("invalid");
        if (!el.checkValidity()) {
            el.classList.add("invalid");
            checksum--;
        }
    }

    if (checksum == elems.length) {
        document.getElementById("saveBtn").disabled = false;
    }
}

/**
 * @description set the selected Entry
 * @param {object} entry
 */
function setSelectedEntry(entry) {
    document.getElementById("newName").value = entry.name;

    var wert = CONTROLLER_ENTRY.round(entry.amount).toString();
    wert.substr(wert.indexOf("."), wert.length).length == 2 ? (wert += 0) : null;
    document.getElementById("newAmount").value = wert;

    document.getElementsByClassName(entry.category)[0].parentElement.parentElement.classList.add("active-category");
    var intervalSelect = document.getElementById("newInterval");
    for (var i = 0; i < intervalSelect.children.length; i++) {
        var option = intervalSelect.children[i];
        if (option.value == entry.interval) {
            option.selected = true;
        }
    }
    document.getElementById("newFrom").value = entry.period.from;
    document.getElementById("newTill").value = entry.period.till;

    if (document.getElementById("newInterval").selectedIndex == 0) {
        document.getElementById("newPeriodRow").style.display = "none";
    } else {
        document.getElementById("newPeriodRow").style.display = "inline-flex";
    }
}

/**
 * @description create the Grid for Categories
 * @param {object} icons
 * @param {int} i
 * @param {int} j
 */
function createGridCategorys(icons, i, j) {
    try {
        if (j % 6 == 0) {
            rowDiv = "";
            rowDiv = document.createElement("div");
            rowDiv.className = "row";
            j++;
        }
        if (icons[i] && icons[i].typ.indexOf(typ) != -1) {
            var text = document.createElement("div");
            text.innerHTML = I18N.__("global", "category_" + icons[i].name);
            text.className = "font-small text-center";
            var colDiv = document.createElement("div");
            colDiv.className = "col-sm-2 category";
            colDiv.id = icons[i].name;
            colDiv.addEventListener("click", el => {
                SELECTEDCATEGORY = el.currentTarget.id;
                toggleActiveCategory(el);
            });
            var iconDiv = document.createElement("div");
            iconDiv.className = "text-center";
            iconDiv.appendChild(icons[i].element);
            colDiv.appendChild(iconDiv);
            colDiv.appendChild(text);
            rowDiv.appendChild(colDiv);

            document.getElementById("categorysDiv").appendChild(rowDiv);
        }
        if (icons[i + 1] != undefined) {
            i++;
            createGridCategorys(icons, i, j);
        }
    } catch (error) {
        throw error;
    }
}

/**
 * @description toggle active Category and show CSS Style :active
 * @param {object} el
 */
function toggleActiveCategory(el) {
    try {
        var parent = document.getElementById("categorysDiv");

        for (var i = 0; i < parent.childElementCount; i++) {
            var row = parent.children[i];
            if (row.tagName != "LABEL") {
                for (var j = 0; j < row.childElementCount; j++) {
                    var col = row.children[j];
                    if (el.currentTarget == col) {
                        col.classList.add("active-category");
                    } else {
                        col.classList.remove("active-category");
                    }
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

/**
 * @description create the Interval Options
 */
function createIntervalOptions() {
    try {
        var select = document.getElementById("newInterval");
        var interval = CONFIG.getInterval();
        for (var key in interval) {
            if (interval.hasOwnProperty(key)) {
                var value = interval[key];
                var opt = document.createElement("option");
                opt.value = key;
                opt.text = value;
                if (opt.key == 0) {
                    opt.selected = true;
                }
                select.appendChild(opt);
            }
        }
    } catch (error) {
        throw error;
    }
}
/**
 * @description set the Start Date for loaded Entry or new Entry
 * @TODO load Entry
 */
function setStartDates() {
    try {
        var newFrom = document.getElementById("newFrom");
        var newTill = document.getElementById("newTill");
        newFrom.setAttribute("min", CONFIG.getPeriod().min);
        newFrom.setAttribute("max", CONFIG.getPeriod().max);
        newTill.setAttribute("min", CONFIG.getPeriod().min);
        newTill.setAttribute("max", CONFIG.getPeriod().max);

        newFrom.value = CONFIG.convertDate(year, month, "1");
        newTill.value = CONFIG.convertDate(year, 12, 31);
    } catch (error) {
        throw error;
    }
}

/**
 * @description GLOBAL FUNTION for close()
 */
ENTRYPAGE.prototype.close = () => {
    close();
};
/**
 * @description close the Window and refresh MainPage
 */
function close() {
    try {
        const electron = require("electron");
        const remote = electron.remote;
        var BrowserWindow = remote.BrowserWindow;
        win = BrowserWindow.getFocusedWindow();
        win.close();
    } catch (error) {
        throw error;
    }
}
/**
 * @description save the Entryin DB
 */
function saveEntry() {
    try {
        var entry = {
            id: SELECTEDENTRY != null ? SELECTEDENTRY.id : null,
            name: document.getElementById("newName").value,
            amount: document.getElementById("newAmount").value,
            category: SELECTEDCATEGORY ? SELECTEDCATEGORY : "others",
            typ: typ,
            interval: parseInt(document.getElementById("newInterval")[document.getElementById("newInterval").selectedIndex].value),
            period: { from: document.getElementById("newFrom").value, till: document.getElementById("newTill").value }
        };
        if (checkValues(entry)) {
            CONTROLLER_ENTRY.saveEntry(entry);
        } else {
            //notSave
            //show Message
        }
    } catch (error) {
        throw error;
    }
}

/**
 * @description check the Values
 * @param {object} entry
 */
function checkValues(entry) {
    if (entry.name == "" || entry.name == undefined) {
        return false;
    }
    if (entry.amount == "" || entry.amount == undefined) {
        return false;
    }
    if (entry.interval != 0 && entry.period.till == "") {
        return false;
    }
    return true;
}
