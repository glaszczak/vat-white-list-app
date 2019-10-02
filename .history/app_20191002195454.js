const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const request = require("request");


const app = express()

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Index Route
app.get('/', (req, res) => {
    let message
    request(url, { json: true }, (err, res, body) => {
        console.log(body.result.subject.name)
        message = body.result.subject.name
        if (err) {
            return console.log("Error: ", err)
        }

        if (res.statusCode !== 200) {
            return console.log("Error in url");
        }
    })

    res.render("index", { message: message })
})

/*
api url:  (bankAccount?date)
https://wl-api.mf.gov.pl/api/search/bank-account/{bank-account}?date=2019-01-01
https://wl-api.mf.gov.pl/api/search/nip/{nip}?date=2019-01-01
*/
//let bankAccount = 15114010780000407309001001
let nip = 5471968502
const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`

/*
request(url, { json: true }, (err, res, body) => {
    console.log(body)

    if (err) {
        return console.log("Error: ", err)
    }

    if (res.statusCode !== 200) {
        return console.log("Error in url");
    }
})
*/



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})