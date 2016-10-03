var {
  BrowserWindow,
  Menu,
  MenuItem,
  app,
} = require('electron');

module.exports = () => {

  // Create the Application's main menu
  var template = [{
    label: 'Robot Browser',
    submenu: [
      {
        label: 'Scan',
        accelerator: 'CmdOrCtrl+Left',
        click: () => {
          BrowserWindow
            .getFocusedWindow()
            .loadURL(`file://${__dirname}/static/index.html`);
        }
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: () => {
          BrowserWindow
            .getFocusedWindow()
            .reload();
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Full Screen',
        accelerator: 'CmdOrCtrl+f',
        click: () => {
          let win = BrowserWindow.getFocusedWindow();
          win.setFullScreen(!win.isFullScreen());
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: () => BrowserWindow.getFocusedWindow().toggleDevTools()
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: () =>  app.quit()
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        selector: 'performMiniaturize:'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        selector: 'performClose:'
      }
    ]
  }];

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
