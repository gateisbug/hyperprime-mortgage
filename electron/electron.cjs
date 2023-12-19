const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const crawl = require('./crawl.cjs');

const isDev = process.env.IS_DEV === 'true';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 760,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
    icon: path.join(__dirname, 'favicon.png')
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow
    .loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../dist/index.html')}`,
    )
    .catch((e) => console.error(e));

  // open the dev tools
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    // On macOS it`s common to re-create a window in the app whene the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it`s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  try {
    await crawl.close();
  } catch (e) {
    console.error(e);
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('ping', (event, arg) => {
  console.log('electron', arg);
  event.reply('ping', arg);
})

ipcMain.on('crawl-init', async (event) => {
  try {
    await crawl.init();
    event.reply('crawl-init', 'true');
  } catch (e) {
    event.reply('crawl-init', 'false');
  }
});

ipcMain.on('crawl-search', async (event, data) => {
  try {
    const search = await crawl.search(data);
    if(!search) {
      event.reply('crawl-search', 'false');
      return;
    }
    const insight = await crawl.getInsight();

    if(search) {
      event.reply('crawl-search', insight);
    }
  } catch (e) {
    event.reply('crawl-search', 'false');
  }
});

ipcMain.on('crawl-close', async (event) => {
  try {
    await crawl.close();
    event.reply('crawl-close', 'true');
  } catch (e) {
    event.reply('crawl-close', 'false');
  }
});