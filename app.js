const { app, BrowserWindow, Menu } = require("electron");
const url = require('url');
const path = require('path');
const { DataBase } = require('./electron/sqlite-controller');
const { initIpcMainHandlers } = require('./electron/ipc.handlers');

let appWindow;
const database = new DataBase;

function createWindw() {
    appWindow = new BrowserWindow({
        width: 1040,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, './electron/preload.js')
        }
    })
    appWindow.maximize();
    Menu.setApplicationMenu(null);

    appWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './dist/browser/index.html'),
            protocol: "file:",
            slashes: true
        })
    );

    // appWindow.webContents.openDevTools();

    appWindow.on('closed', function () {
        appWindow = null;
    });
}

app.on('ready', () => {
    createWindw();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', () => {
    if (appWindow === null) {
        createWindw();
    }
});

database.initConnectionSqlite().then(() => {
    console.log('Load Datatabase successful!');
    initIpcMainHandlers(database);
}).catch((err) => {
    console.error('Error Load Database:\n' + err);
});