const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const CreateModel = require('./../../controllers/Modelos/Create')
const DeleteModel = require('./../../controllers/Modelos/Delete')
const auth = require('./../../utils/auth/auth')


router.get('/',auth,async (req,res) => {
    try {
        res.send('auth')
    } catch (e) {
        res.send(e)
    }
})

router.post('/',auth,async (req,res) => {
    try {
        const modelData = {...req.body,creator:req.session.token}
        const controllerResponse = await CreateModel(modelData)
        res.send(controllerResponse)
    } catch (e) {
        res.send(e)
    }
})

router.delete('/',auth,async (req,res) => {
    try {
        const deleteKey = req.query.deleteKey
        const keyVerification = deleteKey ? true : false
        if(keyVerification){
            const controllerResult = await DeleteModel(deleteKey)
            res.send(controllerResult)
        }else{
            res.send('notValidKey')
        }
    } catch (e) {
        res.send(e)
    }
})

module.exports = router