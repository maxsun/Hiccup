

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
    fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/13QMMogS7svQ7b1nBcEuIdsrCy7yTOmYHQ6KKdrSHz7I',
        init)
        .then((response) => response.json())
        .then(function (data) {
            console.log('Got Sheet:', data)
        });
}

// To be implemented
function create_sheet() {

}

// To be implemented
function append_row_to_sheet() {

}
