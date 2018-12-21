const {
  app,
  BrowserWindow
} = require('electron')

var path = require('path')

// Google API key to get geolocation on Electron
process.env.GOOGLE_API_KEY = 'AIzaSyCeOxoJWG2Vml3fniMYt3yyfGEI_HPsU0Q'

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'src/assets/img/icon.png')
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})