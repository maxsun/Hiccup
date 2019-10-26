const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), appendValues);

  authorize(JSON.parse(content), createHiccupSpreadsheet);

});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, "google.com", "Sometime", "Google");
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Appends sample values to the end of a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1gnt6diIuar_QcLVrKHGNcraEhv4Mg-N2jkNW7uQZTl4/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function appendValues(auth, url, date, title) {
  const sheets = google.sheets({version: 'v4', auth});
  var request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: '1gnt6diIuar_QcLVrKHGNcraEhv4Mg-N2jkNW7uQZTl4',  // TODO: Update placeholder value.

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: 'Class Data',  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.

    // How the input data should be inserted.
    insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.

    resource: {
      // TODO: Add desired properties to the request body.
      "values": [
        [url, date, title],
      ],
    },

    auth: auth,
  };

  sheets.spreadsheets.values.append(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    //console.log(JSON.stringify(response, null, 2));
  });
}

/**
 * Creates a Hiccup spreadsheet
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function createHiccupSpreadsheet(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const resource = {
    properties: {
      title: "Hiccup Test Data",
    },
  };

  sheets.spreadsheets.create({
    resource,
    fields: 'spreadsheetId',
  }, (err, spreadsheet) =>{
    if (err) {
      console.log(err);
    } else {
      console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
      var copyURLS = {
        // The ID of the spreadsheet containing the sheet to copy.
        spreadsheetId: '1wpRwl8ECNeqjUIrl3CQyt9qwV3jDy-nkMiuC5EfC5Hs',
    
        // The ID of the sheet to copy.
        sheetId: 0,
    
        resource: {
          // The ID of the spreadsheet to copy the sheet to.
          destinationSpreadsheetId: spreadsheet.data.spreadsheetId,
    
        },
        auth: auth,
      };
      var copyCALCS = {
        spreadsheetId: '1wpRwl8ECNeqjUIrl3CQyt9qwV3jDy-nkMiuC5EfC5Hs', 
        sheetId: 1950162848, 
        resource: {
          destinationSpreadsheetId: spreadsheet.data.spreadsheetId,
        },
        auth: auth,
      };
      var copyCATEGORIES = {
        spreadsheetId: '1wpRwl8ECNeqjUIrl3CQyt9qwV3jDy-nkMiuC5EfC5Hs', 
        sheetId: 1844542734, 
        resource: {
          destinationSpreadsheetId: spreadsheet.data.spreadsheetId,
        },
        auth: auth,
      };
    
      sheets.spreadsheets.sheets.copyTo(copyURLS, function(err, response) {
        if (err) {
          console.error(err);
          return;
        }
      });
      sheets.spreadsheets.sheets.copyTo(copyCALCS, function(err, response) {
        if (err) {
          console.error(err);
          return;
        }
      });
      sheets.spreadsheets.sheets.copyTo(copyCATEGORIES, function(err, response) {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  });

}