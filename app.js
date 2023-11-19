const { app, BrowserWindow } = require('electron')
let appWindow

function createWindw() {
    appWindow = new BrowserWindow({
        width: 1040,
        height: 800
    })

    appWindow.loadFile('dist/cyberpunk-hexcode-breach/index.html');

    appWindow.on('closed', function () {
        appWindow = null;
    });
}

app.whenReady().then(() => {
    createWindw();
});