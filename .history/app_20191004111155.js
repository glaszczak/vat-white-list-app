const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars");
const apiRes = require('./controllers/apiFunctions')
const axios = require("axios");

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

    let url = `https://wl-api.mf.gov.pl/api/search/nip/${req.query.nipInput}?date=2019-10-01`;
    axios.get(url)
        .then((resp) => {
            //console.log(res.data.result.subject.name)
            //return res.data.result.subject
            res.render("nipRes/index", {
                resData: resp.data.result.subject
            })
        })
        .catch((err) => {
            console.log(err)
        })


    // let data = await apiRes.gedDataFetch(req.query.nipInput)
    // console.log(data)
    // res.render("nipRes/index", {
    //     resData: data
    // })

    /*
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
        */
})

// Get JSON Route
app.get('/getJSON', async (req, res) => {

    let arrRes = await apiRes.getDataFromFileAsJSON()

    let resData = []

    await arrRes.forEach(async (el) => {

        let resName = await apiRes.getResBasedOnNip(el)
        console.log(resName.name)
        resData.push({
            nip: el,
            name: resName.name
        })
        //console.log(resName.accountNumbers)

    })


    res.send(resData)






    // //let resData = await apiRes.getTestDataFromFile()
    // await apiRes.getDataFromFileAsJSON()
    //     .then(data => {
    //         // console.log(Array.isArray(data)) // TRUE
    //         let resData = []
    //         data.forEach(e => {

    //             let resVar = apiRes.getResBasedOnNip(e)
    //                 .then(data => {
    //                     //console.log(data.name)
    //                     // return data.name
    //                     resData.push({ odpoweidz: resVar.name })
    //                 })

    //             console.log(resVar)
    //             resData.push({ nip: e })
    //         })

    //         // console.log(Array.isArray(resData)) // FALSE

    //         res.send(resData)
    //         // res.render("nipRes/index", {
    //         //     resData: data
    //         // })

    //     })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

//apiRes.writeIntoCSV()