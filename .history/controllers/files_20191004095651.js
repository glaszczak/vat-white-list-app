function writeIntoCSV() {
    const data = [{
            name: "John",
            surname: "Snow",
            age: 26
        },
        {
            name: "Clair",
            surname: "White",
            age: 33
        }
    ];

    ws = fs.createWriteStream("fileName.csv");
    csv
        .write(data, {
            headers: true
        })
        .pipe(ws);
}

module.exports.writeIntoCSV = writeIntoCSV;