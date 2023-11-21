const { ipcMain, app } = require("electron");

const ElectronAction = {
    FINDBYID: "FINDBYID",
    FINDALL: "FINDALL",
    ADDLEVEL: "ADDLEVEL",
    UPDATELEVEL: "UPDATELEVEL",
    DELETELEVEL: "DELETELEVEL",
    QUIT: "QUIT"
}

module.exports.initIpcMainHandlers = (database) => {
    console.log('init IPC')

    ipcMain.handle(ElectronAction.FINDALL, (event) => {
        console.log('Event FindAllLevel');
        return new Promise((resolve, reject) => {
            database.findAll().then((result) => {
                resolve(result);
            });
        });
    });

    ipcMain.handle(ElectronAction.ADDLEVEL, (event, level) => {
        console.log('Event AddLevel');
        return new Promise((resolve, reject) => {
            resolve(database.addLevel(level));
        });
    });

    ipcMain.handle(ElectronAction.UPDATELEVEL, (event, level) => {
        console.log('Event UpdateLevel');
        return new Promise((resolve, reject) => {
            resolve(database.updateLevel(level));
        });
    });

    ipcMain.handle(ElectronAction.DELETELEVEL, (event, level) => {
        console.log('Event DeleteLevel');
        return new Promise((resolve, reject) => {
            resolve(database.deleteLevel(level));
        });
    });

    ipcMain.handle(ElectronAction.QUIT, (event) => {
        console.log('Event Quit');
        app.quit();
    });
}