const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const axios = require("axios");
const fs = require("fs");
const upload = require('express-fileupload')
const flash = require("connect-flash");
const session = require('express-session')

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


// Express session midleware
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);


app.use(flash())

// Static folder
app.use(express.static(path.join(__dirname, "public")));


// Global variables (for messages )
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});



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
            res.send("Error while checking NIP")
        })
})

// Multiple NIP Check Route
app.use(upload())
app.post('/', async (req, res) => {
    if (req.files) {
        const file = req.files.filename,
            filename = file.name

        file.mv(`./public/${filename}`, async (err, ) => {
            if (err) {
                console.log(err)
                res.send('error occured ')
            }
            else {
                try {
                    const directory = './public/'
                    //let fileName = 'nips.txt'
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
                    req.flash('success_msg', 'NIPs checked')

                    res.render("nipRes/index", {
                        resData: results
                    })
                    deleteAllFiles()

                }
                catch (err) {
                    req.flash('success_msg', 'NIPs checked')

                    res.send("Error while uploading file")
                    deleteAllFiles()
                }
            }
        })
    }

})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

//func.writeIntoCSV()

// Delete All files in public directory
function deleteAllFiles() {

    const directory = './public/'
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