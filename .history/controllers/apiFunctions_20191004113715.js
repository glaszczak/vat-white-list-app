const axios = require("axios");
const fetch = require("node-fetch")
const readline = require("readline");

/*
api url:  (bankAccount?date)
https://wl-api.mf.gov.pl/api/search/bank-account/{bank-account}?date=2019-01-01
https://wl-api.mf.gov.pl/api/search/nip/{nip}?date=2019-01-01
//let bankAccount = 15114010780000407309001001
*/

// let nip = 5251048432 //5251048432, 5471968502, 6521669329
// let url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`


async function getDataFromFileAsJSON() {
  try {
    let resData = [];

    //add each line into array
    return fs.readFileSync("public/text.txt", "utf-8").split("\r\n");
    //resData.forEach(e => console.log(e))
    //console.log(resData)

    /*
        const rd = readline.createInterface({
            input: fs.createReadStream('public/text.txt')
        });

        const results = await rd.on('line', (line) => {
            resData.push(JSON.parse(line.toString().split('\r\n')))
        });
        */
  } catch (e) {
    return [];
  }
}

module.exports.getDataFromFileAsJSON = getDataFromFileAsJSON;
module.exports.gedDataFetch = gedDataFetch;