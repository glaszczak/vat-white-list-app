const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const axios = require("axios");
const fs = require("fs");
const upload = require('express-fileupload')

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
                singleResp: resp.data.result.subject
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

// Get JSON Route
app.get('/getData', async (req, res) => {
    try {
        const directory = './public/'
        let fileName = 'nips.txt'
        let resData = fs.readFileSync(`${directory}${fileName}`, "utf-8").split("\r\n");
        const promises = resData.map(async nip => {
            const response = await axios({
                url: `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2019-10-01`,
                method: 'GET'
            })

            if (response.data) {
                return {
                    nip: nip,
                    name: response.data.result.subject.name,
                    workingAddress: response.data.result.subject.workingAddress,
                    status: response.data.result.subject.statusVat,
                    accountNumbers: response.data.result.subject.accountNumbers
                }

            }

        })

        const results = await Promise.all(promises)
        //console.log(results)
        //res.send(results)
        res.render("nipRes/index", {
            resData: results
        })

        //Delete uploaded file
        fs.readdir(directory, (err, files) => {
            if (err) throw err
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err
                })
            }
        })

    }
    catch (err) {
        res.send("Error while uploading file")
    }

})


app.post('/', (req, res) => {
    app.use(upload())
    if (req.files) {
        const file = req.files.filename,
            filename = file.name
        file.mv(`./public/${filename}`, (err, ) => {
            if (err) {
                console.log(err)
                res.send('error occured ')
            }
        })
    }

})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

//func.writeIntoCSV()