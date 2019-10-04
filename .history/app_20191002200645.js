const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const apiRes = require('./controllers/apiFunctions')
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
    let message = apiRes.getTaxpayer()
    //console.log(`wynik z index route ${message.name}`)
    console.log(message.name)
    res.render("index", { message: message })
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})