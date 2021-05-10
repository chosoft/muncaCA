const express = require('express')
const router = express.Router()

router.get('/',async (req,res) => {
    try {
        res.render('registrarse')
    } catch (e) {
        delete e
        const message = 'error'
        res.render('error',{message})
    }
})

module.exports = router