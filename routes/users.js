const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Users = []

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.get('/register', (req, res) => {
    res.render('register.ejs')
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
        const newUser = {
            name : req.body.name,
            email : req.body.email,
        }
        console.log(Users)
        console.log(newUser)
        if(Users.includes(newUser)) {
            //User doesn't exist already 
            errors.push({ message : "Account already exists! Please login" })
            res.render('register', { errors })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            newUser["hashedPassword"] = hashedPassword
            Users.push(newUser)
            res.render('login')
            console.log(Users)
        }
    }
})

router.post('/login', (req, res) => {
    console.log(req.body)
})

module.exports = router;