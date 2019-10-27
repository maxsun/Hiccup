
let BASE_SPREADSHEET_ID = '1wpRwl8ECNeqjUIrl3CQyt9qwV3jDy-nkMiuC5EfC5Hs'
let URLS_SHEET_ID = '0'
let CALCS_SHEET_ID = '1950162848'
let CATEGORIES_SHEET_ID = '1844542734'


function get_sheet(token) {
    console.log('Getting Sheet...');
    let init = {
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        'contentType': 'json'
    };
    console.log(token);
    fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/1wpRwl8ECNeqjUIrl3CQyt9qwV3jDy-nkMiuC5EfC5Hs',
        init)
        .then((response) => response.json())
        .then(function (data) {
            console.log('Got Sheet:', data)
        });
}

// To be implemented
function copy_sheet(token, callback) {

    chrome.storage.sync.get('HICCUP_SHEET', function (items) {
        var copySheetToAnotherSpreadsheetRequestBody = {
            // The ID of the spreadsheet to copy the sheet to.
            destinationSpreadsheetId: items['HICCUP_SHEET'],
        };

        var paramsA = {
            // The ID of the spreadsheet containing the sheet to copy.
            spreadsheetId: BASE_SPREADSHEET_ID,
            // The ID of the sheet to copy.
            sheetId: URLS_SHEET_ID,  // TODO: Update placeholder value.
        };

        var paramsB = {
            // The ID of the spreadsheet containing the sheet to copy.
            spreadsheetId: BASE_SPREADSHEET_ID,
            // The ID of the sheet to copy.
            sheetId: CALCS_SHEET_ID,  // TODO: Update placeholder value.
        };

        var request = gapi.client.sheets.spreadsheets.sheets.copyTo(paramsA, copySheetToAnotherSpreadsheetRequestBody);
        var request2 = gapi.client.sheets.spreadsheets.sheets.copyTo(paramsB, copySheetToAnotherSpreadsheetRequestBody);
        request.then(function () {
            request2.then(callback);
        });
    });
}

function create_sheet(gapi0, callback) {
    gapi0.client.sheets.spreadsheets.create({
        properties: {
            title: "Hiccup Data Sheet"
        }
    }).then(callback);
}

function append_to_sheet(gapi0, spreadsheet_data) {
    let params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: spreadsheet_data.sheet_id,  // TODO: Update placeholder value.

        // The A1 notation of a range to search for a logical table of data.
        // Values will be appended after the last row of the table.
        range: 'Copy of URLS!A2:C2',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'RAW',  // TODO: Update placeholder value.

        // How the input data should be inserted.
        insertDataOption: 'OVERWRITE',  // TODO: Update placeholder value.
    };

    let valueRangeBody = {
        // TODO: Add desired properties to the request body.
        range: "Copy of URLS!A2:C2",
        majorDimension: 'ROWS',
        values: [[spreadsheet_data.url, spreadsheet_data.time, spreadsheet_data.title]]
    };
    console.log("Appending...", valueRangeBody);


    let request = gapi0.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function (response) {
        console.log("APPEND RESULT:");
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
    }, function (reason) {
        console.error('error: ' + reason.result.error.message);
    });
}



// To be implemented
function append_row_to_sheet() {

}
