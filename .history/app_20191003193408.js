const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const apiRes = require('./controllers/apiFunctions')

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

// Single NIP Check Route
app.get('/nip/', async (req, res) => {

    apiRes.getResBasedOnNip(req.query.nipInput)
        .then(data => {
            res.render("nipRes/index", {
                resData: data
            })
        })
        .catch(err => {
            res.render("nipRes/index", {
                resData: err
            })
        })
})

// Get JSON Route
app.get('/getJSON', async (req, res) => {

    //let resData = await apiRes.getTestDataFromFile()
    await apiRes.getDataFromFileAsJSON()
        .then(data => {
            let resData = {}
            data.forEach(e => {
                resData.nip = e
                apiRes.getResBasedOnNip(e)
                    .then(data => {
                        res.render("nipRes/index", {
                            resData: data
                        })

                    })

            })

            //res.send(data)
        })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

//apiRes.writeIntoCSV()