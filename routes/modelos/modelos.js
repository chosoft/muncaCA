const express = require('express');
const router = express.Router();
const auth = require('./../../utils/auth/auth')


router.get('/',auth,async (req,res) => {
    try {
        
    } catch (e) {
        res.send(e)
    }
})

module.exports = router