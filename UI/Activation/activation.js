var ipc = require('electron').ipcRenderer
const {remote} = require('electron')
var log = require('electron-log')

var attempts = 0

document.getElementById('close').addEventListener('click', function (e) {
  var key = document.getElementById('key')
  if (key.value === '') {
    log.info('Closing activation window')
    var window = remote.getCurrentWindow()
    ipc.send('child-closed', 'someData')
    window.close()
  } else if (attempts >= 4) {
    log.info('Too many licence attempts')
    // alert('Too many licence attempts') uses dialog instead
  } else {
    attempts += 1
    log.info('Invalid Key')
    // alert('Invalid key')
  }
})
