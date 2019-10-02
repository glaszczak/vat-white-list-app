const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const apiRes = require('./controllers/apiFunctions')

const request = require("request");
const axios = require('axios')

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
    getNameBasedOnNip()
        .then(data => {
            //res.json({ message: 'Request received!', data })
            //res.send(data)
            message = json({ data })
            res.render("index", { message: message })
        })
})


function getNameBasedOnNip() {

    let nip = 5471968502
    const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`
    let respName

    return axios.get(url)
        .then(res => {
            return res.data.result.subject.name
            //respName = res.data.result.subject.name
            //console.log(respName)
        })
}




const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

