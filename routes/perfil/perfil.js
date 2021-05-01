const express = require('express')
const router = express.Router()

const auth = require('./../../utils/auth/auth')

const updateImg = require('./../../controllers/Users/UpdateImg')

const multerConf = require('./../../configs/imgUpload')
const imgChange = multerConf.single('img')

router.get('/', auth, async (req, res) => {
    try {
        res.send('auth')
    } catch (e) {
        res.send(e)
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const action = req.query.action
        const actionVerification = action ? true : false
        const validActions = ['img','username','password']
        if(actionVerification && validActions.includes(action)){
            if(action === validActions[0]){
                imgChange(req,res,(err) => {
                    if(err){
                        res.send(err)
                    }else{
                        const file = req.file
                        const fileVerification = file ? true : false
                        if(fileVerification && file.length > 0){
                            const obj  = {img:file,id: req.session.token}
                            const controllerResponse = await updateImg(obj)
                            res.send(controllerResponse)
                        }else{
                            res.send('imgNull')
                        }
                    }
                })
            }else if(action === validActions[1]){

            
            }else{
                
            }
        }else{
            res.send('notValidAction')
        }
    } catch (e) {
        res.send(e)
    }
})

router