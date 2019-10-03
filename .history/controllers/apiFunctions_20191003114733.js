const axios = require('axios')

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
            //console.log(res.data.result)
            return res.data.result.subject
            //respName = res.data.result.subject.name
        })
}

module.exports.getNameBasedOnNip = getNameBasedOnNip