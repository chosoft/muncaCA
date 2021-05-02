const express = require('express');
const router = express.Router();

const auth = require('./../../utils/auth/auth')

const controllerSend = require('./../../controllers/Mails/Send')

router.get('/', auth, async (req,res) => {
    try {
        res.send('auth')
    } catch (e) {
        res.send(e)
    }
})

router.post('/', auth,async (req, res) => {
    try {
        const body = req.body
        const verification = body ? true : false
        if(verification && Object.keys(body).length > 0) {
            body.id = req.session.token
            const controllerResponse = await controllerSend(body)
            res.send(controllerResponse)
        }else{
            res.send('dataNull')
        }
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

module.exports = router