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
    extended: false
}))
app.use(bodyParser.json())

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Index Route
app.get('/', (req, res) => {
    res.render("index")
    /*
    apiRes.getNameBasedOnNip()
        .then(data => {
            //res.json({ message: 'Request received!', data })
            res.render("index", {
                resData: data
            })
        })
        */
})

app.get('/nip', (req, res) => {
    //res.send('witaj')
    res.render('views/partials/response', {
        nip: 'nip response'
    })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})