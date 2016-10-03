if(require('electron-squirrel-startup')) {
  return;
}
const electron = require('electron');
const menus = require('./menus');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow () {
  menus();
  let mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/static/index.html`);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.on('app-command', (e, cmd) => {
    // Navigate the window back when the user hits their mouse back button
    if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack()
    }
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  app.quit();
});

