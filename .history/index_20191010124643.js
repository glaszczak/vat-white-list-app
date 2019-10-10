const axios = require("axios");

async function getNips() {


    const nips = [{
            nip: '5251048432'
        },
        {
            nip: '5471968502'
        },
        {
            nip: '6521669329'
        },
        {
            nip: '5261724308'
        }
    ]

    // nips.forEach(nip => {
    //     console.log(nip)
    //     console.log(JSON.stringify(nip.nip))
    //     let singleNip = nip.nip
    //     axios.get(`https://wl-api.mf.gov.pl/api/search/nip/${singleNip}?date=2019-10-09`).then(resp => {
    //         console.log(resp.data.result.subject.name)
    //     })
    // })

    nips.map(nip => {
        // console.log(JSON.stringify(nip.nip))
        console.log(nip)
    })

    // const promises = nips.map(async nip => {

    //     // api_url=`https://wl-api.mf.gov.pl/api/search/nip/`

    //     // const data = await axios({
    //     //     url: `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-09`,
    //     //     method: 'get'
    //     // })

    //     // return {
    //     //     nip: nip,
    //     //     name: data.data.result.subject.name
    //     // }
    // })
}

getNips()