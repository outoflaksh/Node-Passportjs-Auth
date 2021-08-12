const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const PORT = process.env.PORT || 3000

const app = express()

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//BODYPARSER
app.use(express.urlencoded( { extended : false } ))

//ROUTES
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(PORT, console.log(`Server up and running on port ${PORT}...`))