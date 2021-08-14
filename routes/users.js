const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

const Users = []
const UserEmails = []

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

//LOGOUT
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


router.post('/register', async (req, res) => {
    //extracting values 
    const { name, email, password, password2 } = req.body

    //making an empty array to store all validation errors
    const errors = []

    //Password length validation
    if (password.length < 8) {
        errors.push({ message : "Password must be at least 8 characters long!"})
    }

    //Password match validation
    if (password !== password2) {
        errors.push({ message : "Passwords must match!"})
    }

    //Sending errors, if any
    if (errors.length > 0) {
        //if there are errors, generate the page again and pass it the errors
        res.render('register.ejs', { errors })

    } else {
        //Passed validaiton check

        if(UserEmails.includes(email)) {
            //User doesn't exist already 
            errors.push({ message : "Account already exists! Please login" })
            res.render('register', { errors })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = {
                name : req.body.name,
                email : req.body.email,
                password : hashedPassword
            }
            Users.push(newUser)
            UserEmails.push(email)
            res.render('login')
        }
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect : '/dashboard',
        failureRedirect : '/users/login'
    })(req, res, next)
})

module.exports = { router : router, Users : Users, UserEmails : UserEmails }