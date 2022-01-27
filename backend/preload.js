const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('connector', {
  sendEvent: (data) => {
    ipcRenderer.send('toMain', data);
  },
  onEvent: (func) => {
    ipcRenderer.on('fromMain', (event, ...args) => func(...args));
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  setTimeout(() => {
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  }, 1000);
});

