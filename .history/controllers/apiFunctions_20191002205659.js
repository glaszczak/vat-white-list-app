const request = require("request");
const https = require("https");


/*
api url:  (bankAccount?date)
https://wl-api.mf.gov.pl/api/search/bank-account/{bank-account}?date=2019-01-01
https://wl-api.mf.gov.pl/api/search/nip/{nip}?date=2019-01-01
//let bankAccount = 15114010780000407309001001
*/


let nip = 5471968502
const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`

const getTaxpayer = () => {
    request(url, { json: true }, (err, res, body) => {
        if (err) {
            return (err)
        }
        //console.log(body)
        return (body)
    })
}


const getTaxpayerHTTPS = () => {
    https.get(url, (resp) => {
        let data = ''

        resp.on('data', (chunk) => {
            data += chunk
        })

        resp.on('end', () => {
            console.log(data)
            return data
        })
    }).on("error", (err) => {
        console.log("Error tutaj")
    })
}


/*
function getTaxpayer() {

    let message
    request(url, { json: true }, (err, res, body) => {

        //console.log(body.result.subject)

        //message = body.result.subject.name
        message = body.result
        //console.log(message)
        if (err) {
            return console.log("Error: ", err)
        }

        if (res.statusCode !== 200) {
            return console.log("Error in url");
        }
    })
    console.log(message)

    return message
}
*/

module.exports.getTaxpayer = getTaxpayer
module.exports.getTaxpayerHTTPS = getTaxpayerHTTPS