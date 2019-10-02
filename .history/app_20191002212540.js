const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const apiRes = require('./controllers/apiFunctions')

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


/*
app.get('/', (req, res) => {

    let nip = 5471968502
    const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`

    let message = ''

    request(url, { json: true }, (err, res, body) => {

        //console.log(body.result.subject)
        message = body.result.subject.name
        //console.log(body.result.subject.name)

        if (err) {
            return console.log("Error: ", err)
        }

        if (res.statusCode !== 200) {
            return console.log("Error in url");
        }
    })
    console.log(message)

    res.render("index", { message: message })
})

*/


// Index Route
app.get('/', (req, res) => {

    //let message = apiRes.getTaxpayer()
    let message
    let nip = 5471968502
    const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`

    const https = require('https');

    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    //let message = apiRes.getTaxpayerHTTPS()
    //console.log(`wynik z index route ${message.name}`)
    //console.log(message)
    res.send(message)
    //res.render("index", { message: message })
})





const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})