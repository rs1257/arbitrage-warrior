const {remote} = require('electron')
var log = require('electron-log')
var ipc = require('electron').ipcRenderer

document.getElementById('cancel').addEventListener('click', function (e) {
  log.info('Closing FBA window')
  var window = remote.getCurrentWindow()
  ipc.send('child-closed', 'someData')
  window.close()
})
