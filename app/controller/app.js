/**
 * @fileoverview app
 * @author Jennifer Schnaible <jennifer.schnaible86@gmail.com> 22.03.2018
 * @description CONTROLLER for main to open the window
 * @module app/controller/app.js
 */

const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const is = require('electron-is');
let mainWindow;
/**
 * @description create Window
 */
function createMainWindow() {
    const windowOptions = {
        width: 800,
        minWidth: 800,
        height: 625,
        minHeight: 135,
        title: app.getName(),
        vibrancy: 'appearance-based'
    };

    mainWindow = new BrowserWindow(windowOptions);

    mainWindow.loadURL('file://' + __dirname + './../view/main.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    if (is.dev()) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createMainWindow);

app.on('close', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createMainWindow();
    }
});

/**
 * @description show an Error-Dialog-Box
 * @param {string} title Dialog-Box Title
 * @param {string} text Dialog-Box Text
 */
exports.showMessageDialog = (window, title, text, type) => {
    const {dialog} = require('electron');
    dialog.showMessageBox(window, {
        type: type,
        title: title,
        message: text,
        buttons: ['Ok'],
        noLink: false
    });
};

ipcMain.on('request-update-year-in-main-window', (event, arg) => {
    mainWindow.webContents.send('switch-year-and-month', arg);
});

ipcMain.on('give-year-to-second-window', (event, arg) => {
    secondWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: true,
        frame: false
    });
    secondWindow.loadURL('file://' + __dirname + './../view/newEntry.html');

    if (is.dev()) {
        secondWindow.webContents.openDevTools();
    }

    secondWindow.setTitle(arg);
    secondWindow.once('ready-to-show', () => {
        secondWindow.show();
    });
});
