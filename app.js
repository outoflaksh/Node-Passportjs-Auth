const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const session = require('express-session')

const PORT = process.env.PORT || 3000

const app = express()

//PASSPORT CONFIGURATION
require('./passport-config')(passport)

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//BODYPARSER
app.use(express.urlencoded( { extended : false } ))

//SESSIONS
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }))

//PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users').router)

app.listen(PORT, console.log(`Server up and running on port ${PORT}...`))