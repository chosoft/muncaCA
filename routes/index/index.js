const express = require('express')
const router = express.Router()
const controllerLogin = require('./../../controllers/Users/Login')
const controllerRegister = require('./../../controllers/Users/Register')
const addErrorLog = require('./../../utils/errors/addErrorLog')

//rendered route 
router.get('/',async (req,res) => {
    try {
        res.render('index')
    } catch (e) {
        //render error 
        const addErrorLogResponse = await addErrorLog(e)
        delete e
        res.render('error',{status:500,title:null,msg:null})
    }
})

//login and register route 
router.post('/', async (req,res) => {
    try {
        const mode = (req.query.mode === 'login' || req.query.mode === 'register') ? true : false
        if(mode){
            if(req.query.mode === 'login'){
                //Login code
                const controllerLoginResponse = await controllerLogin(req.body)
                req.session.token = controllerLoginResponse
                res.send('ok')
            }else{
                //Register code
                const controllerRegisterResponse = await controllerRegister(req.body)
                res.send(controllerRegisterResponse)
            }
        }else{
            res.send('404 Not Found')
        }
    } catch (e) {
        if(e.programatedError){
            res.send(e.msg)
        }else{
            const addErrorLogResponse = await addErrorLog(e)
            delete e
            res.send('error')
        }
    }
})
module.exports = router