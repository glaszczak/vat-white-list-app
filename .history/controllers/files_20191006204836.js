const fs = require("fs");
const csv = require("fast-csv");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function writeIntoCSV(data) {
    //${__dirname}/files/
    const csvWriter = createCsvWriter({
        path: `Result.csv`,
        header: [
            { id: 'nip', title: 'NIP' },
            { id: 'name', title: 'Name' },
            { id: 'workingAddress', title: 'Working Address' },
            { id: 'status', title: 'Status' },
            { id: 'accountNumbers', title: 'Accounts' }
        ]
    });

    csvWriter
        .writeRecords(data)
    //.then(() => console.log('The CSV file was written successfully'));

}

function saveFileOnDesktop() {

    const path = `user_home_dir/Desktop`

}

module.exports.writeIntoCSV = writeIntoCSV;


