

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
function copy_sheet(token) {
    console.log('Getting Sheet...');
    let init = {
        method: 'POST',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({desinationSpreadsheetID: "12345"}),
        'contentType': 'json'
    };
    // copy URLS
    console.log(token);
    fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/1wpRwl8ECNeqjUIrl3CQyt9qwV3jDy-nkMiuC5EfC5Hs/sheets/api/0:copyTo',
        init)
        .then((response) => console.log(response));
    // copy CALCS
    fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/1wpRwl8ECNeqjUIrl3CQyt9qwV3jDy-nkMiuC5EfC5Hs/sheets/api/1950162848:copyTo',
        init)
        .then((response) => console.log(response));
    // copy CATEGORIES
    fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/1wpRwl8ECNeqjUIrl3CQyt9qwV3jDy-nkMiuC5EfC5Hs/sheets/api/1844542734:copyTo',
        init)
        .then((response) => console.log(response));
}

function create_sheet(gapi0) {
    gapi0.client.sheets.spreadsheets.create({
      properties: {
        title: "Hiccup Data Sheet"
      }
    }).then((response) => {
    });
}

// To be implemented
function append_row_to_sheet() {

}
