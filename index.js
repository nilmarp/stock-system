const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    maxWidth: width, 
    maxHeight: height,
    resizable: false,     // Não permitir redimensionar
    minimizable: false,   // Não permitir minimizar
    maximizable: false,   // Não permitir maximizar
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
  })
  
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);