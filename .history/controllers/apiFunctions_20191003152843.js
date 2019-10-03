const axios = require('axios')
const fs = require('fs')
const readline = require('readline')
const csv = require('fast-csv')


/*
api url:  (bankAccount?date)
https://wl-api.mf.gov.pl/api/search/bank-account/{bank-account}?date=2019-01-01
https://wl-api.mf.gov.pl/api/search/nip/{nip}?date=2019-01-01
//let bankAccount = 15114010780000407309001001
*/


// let nip = 5251048432 //5251048432, 5471968502
// let url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`

function getNameBasedOnNip(nip) {
    let url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`
    return axios.get(url)
        .then(res => {
            return res.data.result.subject
        })
        .catch(err => {
            return err
        })
}

function getTestDataFromFile() {

    let resData = []

    //add each line into array
    //const resData = fs.readFileSync('public/text.txt', 'utf-8').split('\n')

    const rd = readline.createInterface({
        input: fs.createReadStream('public/text.txt')
    });

    rd.on('line', (line) => {
        resData.push(JSON.parse(line))
    });

    rd.on('close', (d) => {
        // resData.forEach(e => console.log(e))
    })

    console.log(resData[1])
    return resData
}


function writeIntoCSV() {

    const data = [{
        name: 'John',
        surname: 'Snow',
        age: 26
    }, {
        name: 'Clair',
        surname: 'White',
        age: 33
    }, {
        name: 'Fancy',
        surname: 'Brown',
        age: 78
    }];


    ws = fs.createWriteStream('fileName.csv')
    csv.
    write(data, {
            headers: true
        })
        .pipe(ws)
}

module.exports.getNameBasedOnNip = getNameBasedOnNip
module.exports.getTestDataFromFile = getTestDataFromFile
module.exports.writeIntoCSV = writeIntoCSV