require('dotenv').config()

// Installed packages
const bodyParser = require('body-parser')
const express = require('express')
const { env: { PORT, SESSION_SECRET_LETTER } } = process
const hbs = require('express-handlebards')
const path = require('express')
const logger = require('morgan')
const favicon = require('server-favicon')
const validator = require('express-validator')
const session = require('client-sessions')
const hl = require('handy-log')

// Started app
app = express()


// View Engine
app.engine('hbs', hbs({
    extname: "htbs"
}))
app.set('view engine', 'hbs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(validator())
app.use(session({
    cookieName: "session",
    secret: SESSION_SECRET_LETTER,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))
app.listen(PORT, () => hl.rainbow(`App running on port ${PORT}`))