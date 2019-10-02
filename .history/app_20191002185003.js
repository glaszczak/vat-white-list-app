const express = require('express')
const bodyParser = require('body-parser')

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())