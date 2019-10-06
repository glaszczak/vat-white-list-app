const fs = require("fs");
const csv = require("fast-csv");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function writeIntoCSV(data) {

    const csvWriter = createCsvWriter({
        path: 'out.csv',
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
        .then(() => console.log('The CSV file was written successfully'));

    // const directory = `${__dirname}/files`

    // fs.readdir(directory, (err, files) => {
    //     if (err) throw err
    //     for (const file of files) {

    //     }
    // })

    // const data = [{
    //     name: "John",
    //     surname: "Snow",
    //     age: 26
    // },
    // {
    //     name: "Clair",
    //     surname: "White",
    //     age: 33
    // }
    // ];

    // ws = fs.createWriteStream("fileName.csv");
    // csv
    //     .write(data, {
    //         headers: true
    //     })
    //     .pipe(ws);



}

module.exports.writeIntoCSV = writeIntoCSV;


