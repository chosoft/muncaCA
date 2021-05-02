require('dotenv').config();

const config = {
    mail: process.env.MAIL,
    password: process.env.MAIL_PASSWORD
}

module.exports = { config }