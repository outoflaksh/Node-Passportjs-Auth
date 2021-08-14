const express = require('express')
const router = express.Router()
const ensureAuthentication = require('../auth')

router.get('/', (req, res) => {
    res.render('home.ejs')
})

router.get('/dashboard', ensureAuthentication, (req, res) => {
    res.render('dashboard.ejs', { name : req.user.name})
})

module.exports = router;