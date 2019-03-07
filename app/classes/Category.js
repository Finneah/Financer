/**
 * @fileoverview CLASSES/CATEGORY
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 03.05.2018
 * @description CLASS for CATEGORY
 * @module app/classes/Category.js
 */
module.exports = CATEGORY;

/**
 * @description Main Function to init this Modul
 */
function CATEGORY() {}

/**
 * @description GLOBAL FUNCTION to create Class Category
 * @returns {class} Category
 */
CATEGORY.prototype.createClassCategory = () => {
    return Category;
};

/**
 * @description class Category
 */
class Category {

    /**
     * @class Category
     */
    constructor() {
        this.icons = [
            {
                name: "home",
                icon: "fas fa-home",
                typ: ["expenses"],
                element: null
            },
            {
                name: "food",
                icon: "fas fa-utensils",
                typ: ["expenses"],
                element: null
            },
            {
                name: "cosmetics",
                icon: "fas fa-shopping-bag",
                typ: ["expenses"],
                element: null
            },
            // {
            //     name: "transport",
            //     icon: "fas fa-subway",
            //     typ: ["expenses"],
            //     element: null
            // },
            {
                name: "travel",
                icon: "fas fa-plane",
                typ: ["expenses"],
                element: null
            },
            {
                name: "car",
                icon: "fas fa-car",
                typ: ["expenses"],
                element: null
            },
            {
                name: "entertainment",
                icon: "fas fa-tv",
                typ: ["expenses"],
                element: null
            },
            {
                name: "education",
                icon: "fas fa-graduation-cap",
                typ: ["expenses"],
                element: null
            },
            {
                name: "hobby",
                icon: "fas fa-puzzle-piece",
                typ: ["expenses"],
                element: null
            },
            {
                name: "pets",
                icon: "fas fa-paw",
                typ: ["expenses"],
                element: null
            },
            {
                name: "gifts",
                icon: "fas fa-gift",
                typ: ["expenses", "revenue"],
                element: null
            },
            {
                name: "family",
                icon: "fas fa-users",
                typ: ["expenses"],
                element: null
            },
            {
                name: "work",
                icon: "fas fa-building",
                typ: ["expenses"],
                element: null
            },
            {
                name: "health",
                icon: "fas fa-briefcase-medical",
                typ: ["expenses"],
                element: null
            },
            {
                name: "charity",
                icon: "fas fa-hand-holding-heart",
                typ: ["expenses"],
                element: null
            },
            {
                name: "saveUp",
                icon: "fas fa-piggy-bank",
                typ: ["expenses"],
                element: null
            },
            {
                name: "bills",
                icon: "fas fa-donate",
                typ: ["expenses"],
                element: null
            },
            {
                name: "insurance",
                icon: "fas fa-briefcase",
                typ: ["expenses"],
                element: null
            },
            {
                name: "salary",
                icon: "fas fa-money-bill-alt",
                typ: ["revenue"],
                element: null
            },
            {
                name: "others",
                icon: "fas fa-cart-plus",
                typ: ["expenses", "revenue"],
                element: null
            }
        ];
        this.setIcons();
    }
    /**
     * @description set the Icon-Elements
     */
    setIcons() {
        this.icons.forEach(i => {
            var el = document.createElement("i");
            el.className = i.icon;
            i.element = el;
        });
    }
    /**
     * @description get the Category-element with name=name
     * @param {string} name 
     */
    getIcon(name) {
        var element = undefined;
        this.icons.forEach(i => {      
            if (i.icon == name || i.name == name) {
                element = i.element;
            }
        });
        if (element == undefined) {
            element = document.createElement("i");
            element.className = "fas fa-cart-plus";
        }
        return element;
    }
}
