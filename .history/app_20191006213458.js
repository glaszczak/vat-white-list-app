const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const axios = require("axios");
const fs = require("fs");
const upload = require('express-fileupload')
const flash = require("connect-flash");
const session = require('express-session')
const files = require('./controllers/files')
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
// app.use(
//     session({
//         secret: "secret",
//         resave: true,
//         saveUninitialized: true
//     })
// );
//-momery unleaked---------
app.set('trust proxy', 1);

app.use(session({
    cookie: {
        secure: true,
        maxAge: 60000
    },
    store: new RedisStore(),
    secret: 'secret',
    saveUninitialized: true,
    resave: false
}));

app.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error('Oh no')) //handle error
    }
    next() //otherwise continue
});

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

    // deleteAllFiles()
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
    let getToday = getTodayDate()
    let url = `https://wl-api.mf.gov.pl/api/search/nip/${req.query.nipInput}?date=${getToday}`;
    await axios.get(url)
        .then((resp) => {
            req.flash('success_msg', 'NIP checked')
            res.render("nipRes/index", {
                singleResp: resp.data.result.subject
            })

        })
        .catch((err) => {
            req.flash('error_msg', 'Error while checking NIP')
            res.redirect('/')
        })
})

// Multiple NIP Check Route
app.use(upload())
app.post('/', async (req, res) => {

    // const directory = __dirname
    const directory = `${__dirname}/files`
    let getToday = getTodayDate()

    if (req.files) {
        const file = req.files.filename,
            filename = file.name

        file.mv(`${directory}/${filename}`, async (err, ) => {
            if (err) {
                req.flash('error_msg', `Error while uploading file.
                                        Directory: ${directory}`)
                res.redirect('/')
            } else {
                try {
                    // let resData = fs.readFileSync(`${directory}${fileName}`, "utf-8").split("\r\n");
                    let resData = fs.readFileSync(`${directory}/${filename}`, "utf-8").split("\r\n");

                    const promises = resData.map(async nip => {
                        const response = await axios({
                            url: `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${getToday}`,
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

                    // Run all promises
                    const results = await Promise.all(promises)

                    files.writeIntoCSV(results)

                    // Success
                    // req.flash('success_msg', 'NIPs checked')
                    res.render("nipRes/index", {
                        resData: results
                    })

                    // Delete provided files
                    //deleteFile(directory, filename)

                } catch (err) {
                    //Error
                    req.flash('error_msg', 'Error while uploading file')
                    res.redirect('/')

                    // Delete provided files
                    deleteFile(directory, filename)
                }
            }
        })
    }

})

// Create CSV file
app.get('/csv', (req, res) => {

    // Save Result.csv on user's desktop
    const file = `${__dirname}/Result.csv`;
    res.download(file); // Set disposition and send it.
    req.flash('success_msg', 'File saved')

})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

function deleteFile(filePath, fileName) {

    //const directory = `${filePath}/${fileName}`
    fs.readdir(filePath, (err, files) => {
        if (err) throw err
        fs.unlink(path.join(filePath, fileName), err => {
            if (err) throw err
        })
    })
}

function deleteAllFiles() {

    const directory = `${__dirname}/files`
    //Delete all uploaded files
    fs.readdir(directory, (err, files) => {
        if (err) throw err
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err
            })
        }
    })

    const directory1 = `${__dirname}`
    //Delete Result.csv file
    fs.readdir(directory1, (err, files) => {
        if (err) throw err
        for (const file of files) {
            if (file === 'Result.csv') {
                fs.unlink(path.join(directory1, file), err => {
                    if (err) throw err
                })
            }
        }
    })
}

function getTodayDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    //const today = dd + '/' + mm + '/' + yyyy;
    const result = `${yyyy}-${mm}-${dd}`;
    return result
}