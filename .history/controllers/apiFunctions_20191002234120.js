const axios = require('axios')

/*
api url:  (bankAccount?date)
https://wl-api.mf.gov.pl/api/search/bank-account/{bank-account}?date=2019-01-01
https://wl-api.mf.gov.pl/api/search/nip/{nip}?date=2019-01-01
//let bankAccount = 15114010780000407309001001
*/


let nip = 5251048432
const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`

function getNameBasedOnNip() {

    let nip = 5471968502
    const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`
    let respName

    return axios.get(url)
        .then(res => {
            return res.data.result.subject
            //respName = res.data.result.subject.name
            //console.log(respName)
        })
}

module.exports.getNameBasedOnNip = getNameBasedOnNip