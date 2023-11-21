const { contextBridge, ipcRenderer } = require('electron');

const ElectronAction = {
  FINDBYID: "FINDBYID",
  FINDALL: "FINDALL",
  ADDLEVEL: "ADDLEVEL",
  UPDATELEVEL: "UPDATELEVEL",
  DELETELEVEL: "DELETELEVEL",
  QUIT: "QUIT"
}

const ElectronEvent = {
  GOT_NEW_REQUEST: 'GOT_NEW_REQUEST'
}

/**
 * Espone i metodi protetti che permettono al processo renderer di utilizzare l'oggetto di comunicazione ipcRenderer
 * evitando di esporre l'intero oggetto (maggiore sicurezza)
 *
 * Per maggior sicurezza utilizza anche un sistema di canali whitelist, se la richiesta non utilizza lo specifico canale
 * prensente nella lista dei whitelist, questa viene ignorata
 */
contextBridge.exposeInMainWorld(
  'api', {
  'send': (electronAction, ...args) => {
    const validChannels = Object.values(ElectronAction);
    if (validChannels.includes(electronAction)) {
      ipcRenderer.send(electronAction, ...args);
    }
  },
  'on': (electronEvent, listener) => {
    const validChannels = Object.values(ElectronEvent);
    if (validChannels.includes(electronEvent)) {
      ipcRenderer.on(electronEvent, (event, ...args) => {
        listener(...args);
      });
    }
  },
  'invoke': (electronAction, ...args) => {
    const validChannels = Object.values(ElectronAction);
    if (validChannels.includes(electronAction)) {
      return ipcRenderer.invoke(electronAction, ...args);
    }
  },
  'removeListener': (electronEvent, listener) => {
    const validChannels = Object.values(ElectronEvent);
    if (validChannels.includes(electronEvent)) {
      ipcRenderer.removeListener(electronEvent, listener);
    }
  },
  'removeAllListeners': (electronEvent) => {
    const validChannels = Object.values(ElectronEvent);
    if (validChannels.includes(electronEvent)) {
      ipcRenderer.removeAllListeners(electronEvent);
    }
  },
});