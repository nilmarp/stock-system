const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;

require('dotenv').config()

require('./backend/build/index') // loads api

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`http://${process.env.HOST}:${process.env.PORT}`)

  const template = [
    {
      label: '',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});