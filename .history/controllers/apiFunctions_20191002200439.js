const request = require("request");

/*
api url:  (bankAccount?date)
https://wl-api.mf.gov.pl/api/search/bank-account/{bank-account}?date=2019-01-01
https://wl-api.mf.gov.pl/api/search/nip/{nip}?date=2019-01-01
*/
//let bankAccount = 15114010780000407309001001
let nip = 5471968502
const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`

function getTaxpayer() {
    let message
    request(url, { json: true }, (err, res, body) => {

        message = body.result.subject.name
        if (err) {
            return console.log("Error: ", err)
        }

        if (res.statusCode !== 200) {
            return console.log("Error in url");
        }
    })

    return message

}

module.exports.getTaxpayer = getTaxpayer