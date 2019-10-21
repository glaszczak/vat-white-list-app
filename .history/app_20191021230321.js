const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const axios = require("axios");
const fs = require("fs");
const upload = require('express-fileupload')
const flash = require("connect-flash");
const session = require('express-session')
var parseurl = require('parseurl')
const files = require('./controllers/files')
const app = express()
require('dotenv/config')

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
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})
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
    deleteAllFiles()
    res.render("index")
})


// Single NIP Check Route
app.get('/nip/', async (req, res) => {
    let getToday = getTodayDate()
    let url = `${process.env.API_KEY}${req.query.nipInput}?date=${getToday}`;
    await axios.get(url)
        .then((resp) => {
            req.flash('success_msg', 'NIP checked')
            res.render("nipRes/index", {
                singleResp: resp.data.result.subject
            })

        })
        .catch((err) => {
            req.flash('error_msg', 'Error while checking NIP.')
            res.redirect('/')
        })
})


// Multiple NIP Check Route
app.use(upload())

app.post('/nipsList/', (req, res) => {
    // const fileName = req.query.filename // For get
    const file = req.files.filename
    const fileName = req.files.filename.name // For post
    const directory = path.join(__dirname, "public", fileName)
    const getToday = getTodayDate()

    // Save selected file into 'public' folder
    file.mv(directory, async (err) => {
        if (err) {
            return
        } else {

            // Array of all nips
            const resData = fs.readFileSync(directory, "utf-8").split("\r\n")

            // const promises = resData.map(async nip => {
            //     const response = await axios({
            //         url: `${process.env.API_KEY}${nip}?date=${getToday}`,
            //         method: 'GET'
            //     })

            //     if (response.data) {
            //         return {
            //             nip: nip,
            //             name: response.data.result.subject.name,
            //             workingAddress: response.data.result.subject.workingAddress,
            //             status: response.data.result.subject.statusVat,
            //             accountNumbers: response.data.result.subject.accountNumbers
            //         }
            //     }

            // })

            const result = resData.map(nip => {
                return {
                    nip: nip,
                    name: `name of ${nip}`,
                    workingAddress: `working address of ${nip}`,
                    status: `status of ${nip}`,
                    accountNumbers: `accounts of ${nip}`
                }
            })

            // Run all promises
            const results = await Promise.all(promises)


            // Save as csv file
            files.writeIntoCSV(results)

            res.render("nipRes/index", {
                resData: results
            })

        }
    })
})


// app.post('/', async (req, res) => {

//     // const directory = __dirname
//     // const directory = `${__dirname}/files`
//     const directory = path.join(__dirname, "public")
//     let getToday = getTodayDate()

//     if (req.files) {
//         const file = req.files.filename,
//             filename = file.name

//         file.mv(path.join(directory, filename), async (err) => {
//             if (err) {
//                 req.flash('error_msg', `Error while uploading file. Directory: ${directory}`)
//                 //res.redirect('/')
//             } else {
//                 try {
//                     let resData = fs.readFileSync(path.join(directory, filename), "utf-8").split("\r\n");

//                     const promises = resData.map(async nip => {
//                         const response = await axios({
//                             url: `${process.env.API_KEY}${nip}?date=${getToday}`,
//                             method: 'GET'
//                         })

//                         if (response.data) {
//                             return {
//                                 nip: nip,
//                                 name: response.data.result.subject.name,
//                                 workingAddress: response.data.result.subject.workingAddress,
//                                 status: response.data.result.subject.statusVat,
//                                 accountNumbers: response.data.result.subject.accountNumbers
//                             }
//                         }
//                     })

//                     // Run all promises
//                     const results = await Promise.all(promises)


//                     //files.writeIntoCSV(results)
//                     console.log(results)
//                     // Success
//                     // req.flash('success_msg', 'NIPs checked')
//                     res.render("nipRes/index", {
//                         resData: results
//                     })

//                     // Delete provided files
//                     //deleteFile(directory, filename)

//                 } catch (err) {
//                     //Error
//                     // console.log(err)
//                     req.flash('error_msg', 'Error while uploading file.')
//                     res.send(err)
//                     //res.redirect('/')

//                     // Delete provided files
//                     //deleteFile(directory, filename)
//                 }
//             }
//         })
//     }

// })


// Save CSV file into disk
app.get('/csv', (req, res) => {

    const file = path.join(__dirname, 'Result.csv')

    res.download(file); // Set disposition and send it
    req.flash('success_msg', 'File saved')

})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

function deleteFile(filePath, fileName) {

    fs.readdir(filePath, (err, files) => {
        if (err) throw err
        fs.unlink(path.join(filePath, fileName), err => {
            if (err) throw err
        })
    })
}

function deleteAllFiles() {

    const directory = path.join(__dirname, 'public')
    //Delete all uploaded files
    fs.readdir(directory, (err, files) => {
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err
            })
        }
    })

    //Delete Result.csv file
    const directoryCSV = `${__dirname}`
    fs.readdir(directoryCSV, (err, files) => {
        if (err) throw err
        for (const file of files) {
            if (file === 'Result.csv') {
                fs.unlink(path.join(directoryCSV, file), err => {
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