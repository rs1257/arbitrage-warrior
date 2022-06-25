const {remote} = require('electron')
var log = require('electron-log')
var ipc = require('electron').ipcRenderer
var api = require('./app')
var fs = require('fs')
// var path = require('path')

document.getElementById('back').classList.add('disabled')
document.getElementById('finish').classList.add('disabled')

document.getElementById('cancel').addEventListener('click', function (e) {
  log.info('Closing TA window')
  var window = remote.getCurrentWindow()
  ipc.send('child-closed', 'someData')
  window.close()
})

document.getElementById('next').addEventListener('click', function (e) {
  var fileId = document.getElementById('url').value
  // var out = document.getElementById('out').value
  // do maths on csv
  // '1miwfe_0xtod337caEsGBcwwUlz8zbmXO'
  // Can I do dropdown of all csv options??
  api.authorize_functions(fileId, 'TA.csv')
  // download and add to then upload output. (or sheets api just append??)
  // if there is an error I need to show an alert
})

var loader = '<progress id="progress" value="50" max="100">0%</progress>'
