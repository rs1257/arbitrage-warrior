const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')
var log = require('electron-log')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly']

const TOKEN_PATH = './token.json'

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize (credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

function authorizeDownload (credentials, callback, FileId, location) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client, FileId, location)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken (oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles (auth) {
  const drive = google.drive({version: 'v3', auth})
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)'
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    const files = res.data.files
    if (files.length) {
      console.log('Files:')
      files.map((file) => {
        console.log(`${file.name} (${file.id})`)
      })
    } else {
      console.log('No files found.')
    }
  })
}

async function downloadFile (auth, fileId, location) {
  return new Promise(async (resolve, reject) => {
    const dest = fs.createWriteStream(location)
    const drive = google.drive({version: 'v3', auth})
    let progress = 0
    const res = await drive.files.get(
      {fileId, alt: 'media'},
      {responseType: 'stream'}
    )
    res.data
      .on('end', () => {
        log.info('Done downloading file.')
        processCSV()
        Promise.resolve('Done')
      })
      .on('error', err => {
        log.error('Error downloading file.')
        Promise.reject(err)
      })
      .on('data', d => {
        progress += d.length
        readline.clearLine(process.stdout)
        readline.cursorTo(process.stdout, 0)
        process.stdout.write(`Downloaded ${progress} bytes`)
      })
      .pipe(dest)
  })
}

module.exports = {
  authorize_functions: function (src, des) {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err)
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), listFiles)
      authorizeDownload(JSON.parse(content), downloadFile, src, des)
    })
  }
}

function processCSV () {
  // Read conf.json and define to JSON type
  var contents = fs.readFileSync('./conf.json')
  var jsonContent = JSON.parse(contents)

  // Config Variables
  var DataSearch = jsonContent.data_search_variables
  // var OverheadCosts = jsonContent.overhead_costs
  // var AnalysisData = jsonContent.analysis_data
  // var Advanced = jsonContent.advanced

  var csv = fs.readFileSync('./TA.csv', 'utf8').split(/\r?\n/)

  var data = []
  csv.forEach(function (value) {
    value = value.split(',')
    if (value[24] > DataSearch.roi_threshold && value[18] < DataSearch.buy_price_threshold) {
      data.push(value)
    }
    // asin is no. 9
  })
  log.info(data)
}

/* function setup (src, des) {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listFiles)
    authorizeDownload(JSON.parse(content), downloadFile, src, des)
  })
}

setup('1miwfe_0xtod337caEsGBcwwUlz8zbmXO', 'TA.csv')
*/
