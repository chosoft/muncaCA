const express = require('express');
const router = express.Router();

const auth = require('./../../utils/auth/auth')

router.get('/',auth, async (req,res) => {
    try {
        res.render('addModelos',{renderInfo:req.renderData})
    } catch (e) {
        res.send('error')
    }
}) 

module.exports = router