const express = require('express');
const router = express.Router();

const auth = require('./../../utils/auth/auth')
const upload = require('./../../configs/docsUpload')
const docsMiddleware = upload.array('docs',15)

const Get = require('./../../controllers/Docs/Get')
const createController = require('./../../controllers/Docs/Create')
const deleteController = require('./../../controllers/Docs/Delete')

router.get('/',auth, async(req,res) => {
    try {
        const getDocuments = await Get()
        res.render('documentos',{...getDocuments,renderInfo: req.renderData})
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
        if(uploadVerification && req.files.length >0){
            const lengthVerification = files.length <= 0 ? true : false
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
        console.error(e)
        res.send(e)
    }
})

router.delete('/', auth, async(req, res) =>{
    try {
        const { deleteKey } = req.body
        console.log(typeof deleteKey)
        const keyVerification = deleteKey ? true : false
        console.log(keyVerification)
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