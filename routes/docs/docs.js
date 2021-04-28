const express = require('express');
const router = express.Router();

const auth = require('./../../utils/auth/auth')
const upload = require('./../../configs/docsUpload')
const docsMiddleware = upload.array('docs',15)

const createController = require('./../../controllers/Docs/Create')

router.get('/',auth, async(req,res) => {
    try {
        res.send('auth')
    } catch (e) {
        res.send(e)
    }
})

router.post('/', auth, docsMiddleware, async(req,res) => {
    try {
        const files = req.files
        const uploadVerification = files ? true : false
        const id = req.session.token
        const controllerObj = {files,creator: id}
        if(uploadVerification){
            const controllerResult = createController(controllerObj)
        }else{
            res.send('docsNull')
        }
        
    } catch (e) {
        res.send(e)
    }
})

module.exports = router 