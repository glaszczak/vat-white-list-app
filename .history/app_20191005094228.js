const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const func = require('./controllers/functions')
const axios = require("axios");
const fs = require("fs");

const app = express()

// Handlebars middleware
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}))
app.set('view engine', 'handlebars')

// Body-parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Index Route
app.get('/', (req, res) => {
    res.render("index")
})


/*
api url:  (bankAccount?date)
https://wl-api.mf.gov.pl/api/search/bank-account/{bank-account}?date=2019-01-01
https://wl-api.mf.gov.pl/api/search/nip/{nip}?date=2019-01-01
//let bankAccount = 15114010780000407309001001
*/
// let nip = 5251048432 //5251048432, 5471968502, 6521669329
// let url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`

// Single NIP Check Route
app.get('/nip/', async (req, res) => {
    let url = `https://wl-api.mf.gov.pl/api/search/nip/${req.query.nipInput}?date=2019-10-01`;
    await axios.get(url)
        .then((resp) => {
            //console.log(res.data.result.subject.name)
            res.render("nipRes/index", {
                resData: resp.data.result.subject
            })
        })
        .catch((err) => {
            console.log(err)
        })
})


async function getProperty(nip) {
    let url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`;
    let respName
    await axios.get(url)
        .then((resp) => {
            respName = resp.data.result.subject.name
            //console.log(ans)
            return respName
        })

    return respName
    /*.cath(error => {
        console.log(error)
    })
    */
}

// Get JSON Route
app.get('/getJSON', async (req, res) => {

    //add each line into array
    let resData = fs.readFileSync("public/text.txt", "utf-8").split("\r\n");
    let respJson = []

    const promises = resData.map(async repo => {
        const response = await axios({
            url: `https://wl-api.mf.gov.pl/api/search/nip/${repo}?date=2019-10-01`,
            method: 'GET'
        })

        return {
            nip: repo,
            name: response.data.result.subject.name,
            residenceAddress: response.data.result.subject.residenceAddress,
            workingAddress: response.data.result.subject.workingAddress,
            status: response.data.result.subject.statusVat,
            accountNumbers: response.data.result.subject.accountNumbers
        }

    })

    const results = await Promise.all(promises)
    console.log(results)

    //res.send(results)

    res.render("nipRes/index", {
        resData: results
    })


})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

//func.writeIntoCSV()