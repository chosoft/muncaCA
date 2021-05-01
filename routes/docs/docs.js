const express = require('express');
const router = express.Router();

const auth = require('./../../utils/auth/auth')
const upload = require('./../../configs/docsUpload')
const docsMiddleware = upload.array('docs',15)

const createController = require('./../../controllers/Docs/Create')
const deleteController = require('./../../controllers/Docs/Delete')

router.get('/',auth, async(req,res) => {
    try {
        
    } catch (e) {
        res.send(e)
    }
})

router.post('/', auth, docsMiddleware, async(req,res) => {
    try {
        const files = req.files
        const uploadVerification = files ? true : false
        const lengthVerification = (files.length <= 0) ? true : false
        const id = req.session.token
        const controllerObj = {files,creator: id}
        if(uploadVerification){
            if(lengthVerification){
                res.send('docsNull')
            }else{
                const controllerResult = await createController(controllerObj)
                res.send(controllerResult)
            }
        }else{
            res.send('docsNull')
        }
        
    } catch (e) {
        res.send(e)
    }
})

router.delete('/', auth, docsMiddleware, async(req, res) =>{
    try {
        const { deleteKey } = req.body
        const keyVerification = deleteKey ? true : false
        if(keyVerification){
            const controllerResponse = await deleteController(deleteKey)
            res.send(controllerResponse)
        }else{
            res.send('keyNull')
        }
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})
module.exports = router 