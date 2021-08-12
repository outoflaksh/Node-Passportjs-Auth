const LocalStrategy = require('passport-local').Strategy

function initializePassport(passport) {
    const authenticateUser = (email, password, done) => {
        return
    }

    passport.use(new LocalStrategy({ usernameField : 'email', passwordField : 'password'}, authenticateUser))

}

module.exports = initializePassport