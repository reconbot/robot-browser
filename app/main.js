if(require('electron-squirrel-startup')) {
  return;
}
const electron = require('electron');
const menus = require('./menus');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
  menus();
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.center();
  mainWindow.openDevTools();
  mainWindow.loadURL(`file://${__dirname}/static/index.html`);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  app.quit();
});

