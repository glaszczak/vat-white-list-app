const axios = require("axios");

async function getNips() {


    const nips = [
        { nip: '5251048432' },
        { nip: '5471968502' },
        { nip: '6521669329' },
        { nip: '5261724308' }
    ]


    const updatedNips = nips.map(nip => {

        // api_url=`https://wl-api.mf.gov.pl/api/search/nip/`

        const data = axios({
            url: `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-09`,
            method: 'GET'
        })

    })
}

getNips()
