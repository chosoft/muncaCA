const express = require('express')
const router = express.Router()

const auth = require('./../../utils/auth/auth')

const updateImg = require('./../../controllers/Users/UpdateImg')
const updateUsername = require('./../../controllers/Users/UpdateUsername')
const updatePassword = require('./../../controllers/Users/UpdatePassword')

const multerConf = require('./../../configs/imgUpload')
const imgChange = multerConf.single('img')

router.get('/', auth, async (req, res) => {
    try {
        res.send('auth')
    } catch (e) {
        res.send(e)
    }
})

router.put('/', auth, async (req, res) => {
    try {
        const action = req.query.action
        const actionVerification = action ? true : false
        const validActions = ['img','username','password']
        if(actionVerification && validActions.includes(action)){
            if(action === validActions[0]){
                imgChange(req,res,async (err) => {
                    if(err){
                        res.send(err)
                    }else{
                        const file = req.file
                        const fileVerification = file ? true : false
                        if(fileVerification){
                            const obj  = {img:file.filename,id: req.session.token}
                            const controllerResponse = await updateImg(obj)
                            res.send(controllerResponse)
                        }else{
                            res.send('imgNull')
                        }
                    }
                })
            }else if(action === validActions[1]){
                const { username } = req.body
                const verfication = username ? true : false
                if(verfication){
                    const obj = {username,id:req.session.token}
                    const controllerResponse = await updateUsername(obj)
                    res.send(controllerResponse)
                }else{
                    res.send('dataNull')
                }
            }else{
                const { password } = req.body
                const verification = password ? true : false
                if(verification){
                    const obj = {password,id:req.session.token}
                    const controllerResponse = await updatePassword(obj)
                    res.send(controllerResponse)
                }else{
                    res.send('dataNull')
                }
            }
        }else{
            res.send('notValidAction')
        }
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

module.exports = router