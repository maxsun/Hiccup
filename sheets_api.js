
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
function copy_sheet(token, destID) {
    var copySheetToAnotherSpreadsheetRequestBody = {
        // The ID of the spreadsheet to copy the sheet to.
        destinationSpreadsheetId: destID,
    };

    var params = {
        // The ID of the spreadsheet containing the sheet to copy.
        spreadsheetId: BASE_SPREADSHEET_ID,
        // The ID of the sheet to copy.
        sheetId: URLS_SHEET_ID,  // TODO: Update placeholder value.
    };

    var request = gapi.client.sheets.spreadsheets.sheets.copyTo(params, copySheetToAnotherSpreadsheetRequestBody);
    request.then(function (response) {
        console.log(response.result);
    }, function (reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function create_sheet(gapi0, callback) {
    gapi0.client.sheets.spreadsheets.create({
        properties: {
            title: "Hiccup Data Sheet"
        }
    }).then(callback);
}

// To be implemented
function append_row_to_sheet() {

}
