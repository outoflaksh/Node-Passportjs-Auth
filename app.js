const express = require('express')
const expressLayouts = require('express-ejs-layouts')

require('dotenv').config()
const PORT = process.env.PORT || 3000

const app = express()

//ROUTES
app.get('/', require('./routes/index'))
app.get('/users', require('./routes/users'))

app.listen(PORT, console.log(`Server up and running on port ${PORT}...`))