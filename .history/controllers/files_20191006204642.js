const fs = require("fs");
const csv = require("fast-csv");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function writeIntoCSV(data) {

    const csvWriter = createCsvWriter({
        path: `${__dirname}/files/Result.csv`,
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

}

module.exports.writeIntoCSV = writeIntoCSV;


