const express = require('express')
const router = express.Router()
const controllerLogin = require('./../../controllers/Users/Login')
const controllerRegister = require('./../../controllers/Users/Register')
router.get('/',async (req,res) => {
    try {
        res.render('index')
    } catch (e) {
        delete e
        const message = 'error'
        res.render('error',{message})
    }
})

router.post('/:mode', async (req,res) => {
    try {
        const mode = (req.params.mode === 'login' || req.params.mode === 'register') ? true : false
        if(mode){
            if(req.params.mode === 'login'){
                const controllerLoginResponse = await controllerLogin(req.body)
                req.session.token = controllerLoginResponse
                res.send('ok')
                
            }else{
                const controllerRegisterResponse = await controllerRegister(req.body)
                res.send(controllerRegisterResponse)
            }
        }else{
            res.send('404 Not Found')
        }
    } catch (e) {
        console.log(e)
        delete e 
        const message = 'error'
        res.send(message)
    }
})
module.exports = router