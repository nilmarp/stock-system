const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const terminate = require('terminate');
require('dotenv').config();
let backend;

const mode = process.env.MODE == 'production'

app.on('ready', () => {

  if (mode) {

    backend = exec('cd backend && npm start', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    backend.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      if (data.includes('running')) {
        console.log('cheguei aqui');
        createWindow();
      }
    });
  }else{
    createWindow();
  }
});

let isQuitting = false;

app.on('before-quit', (event) => {
  if (!isQuitting) {
    event.preventDefault();

    if (mode) {
      console.log(backend.pid)
      terminate(backend.pid, (err) => {
        console.log(err);
        isQuitting = true;
        app.quit();
      });
    }
  }
});

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