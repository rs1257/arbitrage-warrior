const {remote} = require('electron')

module.exports = {
  license: function () {
    var win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      modal: true,
      frame: false,
      height: 500,
      width: 400,
      show: false,
      resizable: false,
      focus: true
    })

    win.loadFile('./Activation/license.html')
    win.focus()

    win.once('ready-to-show', () => {
      document.getElementById('cover').style.display = 'inline'
      win.show()
      // in.webContents.openDevTools()
    })

    win.on('close', function () {
      win = null
      document.getElementById('cover').style.display = 'none'
      document.getElementById('activated').innerHTML = 'Activated'
    })
  },
  ta: function () {
    var win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      modal: true,
      frame: false,
      height: 500,
      width: 600,
      show: false,
      resizable: false,
      focus: true
    })

    win.loadFile('./TA/TA_Wizard.html')
    win.focus()

    win.once('ready-to-show', () => {
      document.getElementById('cover').style.display = 'inline'
      win.show()
      win.webContents.openDevTools()
    })

    win.on('close', function () {
      win = null
      document.getElementById('cover').style.display = 'none'
    })
  },
  fba: function () {
    var win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      modal: true,
      frame: false,
      height: 500,
      width: 600,
      show: false,
      resizable: false,
      focus: true
    })

    win.loadFile('./FBA/FBA_Wizard.html')
    win.focus()

    win.once('ready-to-show', () => {
      document.getElementById('cover').style.display = 'inline'
      win.show()
      // win.webContents.openDevTools()
    })

    win.on('close', function () {
      win = null
      document.getElementById('cover').style.display = 'none'
    })
  }
}
