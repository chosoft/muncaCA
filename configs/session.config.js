const { config } = require('./envConfig')
const configSession = {
    name:"MUNCASOAP",
    secret:config.secret,
    resave:true,
    saveUninitialized: true,
    maxAge:900000,
}   

module.exports = configSession