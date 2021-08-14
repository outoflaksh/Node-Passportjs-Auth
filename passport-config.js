const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Users = require('./routes/users').Users
const UserEmails = require('./routes/users').UserEmails

function initializePassport(passport) {
    function authenticateUser (email, password, done) {
        //Check if the user exists
        if (!UserEmails.includes(email)) {
            return done(null, false, { message : "User doesn't exist, please register!" })
        }
        const getUser = (email) => Users[UserEmails.indexOf(email)]
        //User exists
        //Password check
        const user = getUser(email)
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                return done(null, user)
            } else {
                return done(null, false, { message : "Passwords don't match!" })
            }
        })

        passport.serializeUser((user, done) => {
            done(null, user.email)
        })

        passport.deserializeUser((email, done) => {
            const user = getUser(email)
            done(null, user)
        })

    }

    passport.use(new LocalStrategy({ usernameField : 'email', passwordField : 'password'}, authenticateUser))

}

module.exports = initializePassport