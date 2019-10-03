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

app.get('/nip/', async (req, res) => {

    let resData = await apiRes.getTestDataFromFile()
    console.log(resData)
    res.send(resData)

    // apiRes.getNameBasedOnNip(req.query.nipInput)
    //     .then(data => {
    //         //res.json({ message: 'Request received!', data })
    //         res.render("nipRes/index", {
    //             resData: data
    //         })
    //     })
    //     .catch(err => {
    //         console.log(`it's an error`)
    //         res.render("nipRes/index", {
    //             resData: err
    //         })
    //     })

    // //console.log(req.query)
    // let resDatas = req.query
    // res.render('nipRes/index', {
    //     resData: resDatas
    // })

})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

//apiRes.writeIntoCSV()