const express = require('express')
const router = express.Router()

const auth = require('./../../utils/auth/auth')

router.get('/', auth, async (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (e) {
        res.redirect('/')
    }
})

module.exports = router