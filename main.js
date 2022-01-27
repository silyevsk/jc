const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


let t = 1;
ipcMain.on('toMain', (event, arg) => {
  event.reply('fromMain', t++);
  console.log('sent reply');
});

console.log('test A');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'backend/preload.js')
    }
  });
  win.loadFile('frontend/index.html')
  win.webContents.openDevTools();
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

