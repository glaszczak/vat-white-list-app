const fs = require("fs");
const csv = require("fast-csv");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function writeIntoCSV(data) {

    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            { id: 'name', title: 'Name' },
            { id: 'surname', title: 'Surname' },
            { id: 'age', title: 'Age' },
            { id: 'gender', title: 'Gender' },
        ]
    });





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


