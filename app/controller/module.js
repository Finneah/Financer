/**
 * @fileoverview Global Module
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 22.03.2018
 * @description CONTROLLER to load the Modules to use them and its global functions
 * @module app/controller/module.js
 */

//CLASSES
window.CLASS_ENTRY = new (require("./../classes/Entry"))();
window.NEW_ENTRY = window.CLASS_ENTRY.createClassEntry();

window.CLASS_CATEGORY = new (require("./../classes/Category"))();
window.NEW_CATEGORY = window.CLASS_CATEGORY.createClassCategory();

//CONTROLLER
window.I18N = new (require("./i18n"))();
window.ERRORHANDLER = new (require("./errorhandling"))();
window.DATABASE = new (require("./database"))();
window.CONFIG = new (require("./config"))();


window.CONTROLLER_ENTRY = new (require("./entry"))();
//RENDERER
window.translator = new (require("./../renderer/translator"))();
