var PythonShell = require('python-shell')
var log = require('electron-log')

PythonShell.run('./../DriveApi/main.py', function (err) {
  if (err) throw err
  log.info('CSV successfully downloaded')
})

/* isOnline().then(online => {
    if (!online){
      log.error("No internet connection");
      //dialog.showMessageBox(dialogOptions, app.quit());
    }
    else {
      log.info("Downloading latest CSV")
      require('./api');
    }
  }); */
