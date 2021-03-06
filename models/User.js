const mongoose = require('mongoose')
const { Schema,model } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String},
    rol:{required:true,type:String,default:'user'},
    img:{required:true,type:String,default:'/img/profile/default.svg'},
    phone:{required:true,type:Number},
    active:{required:true,type:Boolean,default:false}
})

const Usuario = new model('Usuario',userSchema)

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function saveUser(obj){
    return new Promise(async (resolve, reject) => {
        try {
            const uniqueName = await Usuario.findOne({username:obj.username})
            const uniqueEmail = await Usuario.findOne({email:obj.email})
            const uniquePhone = await Usuario.findOne({phone:obj.phone})
            const verificationNull = (uniqueName === null && uniqueEmail === null && uniquePhone === null) ? true : false
            if(verificationNull){
                const saltRounds = randomNumber(10,25)

                bcrypt.hash(obj.password,saltRounds, async (err,hash) => {
                    try {

                        if(err){
                            reject(err)
                        }else{
                            const finalObj = {
                                ...obj,
                                password:hash
                            }
                            delete finalObj.passwordConfirmation
                            const user = new Usuario(finalObj)
                            const resultSave = await user.save()
                            resolve('ok')
                        }
                    } catch (e) {
                        reject(e)
                    }

                })
            }else{
                const arrayNulls = [uniqueName,uniqueEmail,uniquePhone]
                for (let i = 0; i < arrayNulls.length; i++) {
                    if(arrayNulls[i] !== null){
                        switch (i) {
                            case 0:
                                reject('usernameInUse')
                                break;
                            case 1:
                                reject('emailInUse')
                                break;
                            case 2:
                                reject('phoneInUse')
                                break;
                            default:
                                break;
                        }
                    }else{
                        if(i === arrayNulls.length -1 ){
                            reject('invalidInput')
                        }
                    }
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
function loginUser({email,password}){
    return new Promise(async(resolve, reject) => {
        try {
            const userData = await Usuario.findOne({email})
            if(userData === null){
                reject({msg:'errorLogin',programatedError:true})
            }else{
                const passwordVerification = await bcrypt.compare(password, userData.password)
                if(passwordVerification){
                    const idToken = userData._id
                    console.log(passwordVerification)
                    resolve(idToken)
                }else{
                    reject({msg:'errorLogin',programatedError:true})
                }
            }
        } catch (e) { 
            reject(e)
        }
    })
}
function authUser(id){
    return new Promise(async(resolve, reject) => {
        try {
            const userData = await Usuario.findOne({_id:id,active:true})
            if(userData === null){
                reject({auth:false})
            }else{
                const renderData = {
                    username:userData.username,
                    email:userData.email,
                    img:userData.img,
                    rol:userData.rol,
                    phone:userData.phone,
                }
                resolve({auth:true,renderData})
            }
        } catch (e) {
            reject(e)
        }
    })
}
function updateImg({img,id}){
    return new Promise(async (resolve, reject) => {
        try {
            const userData = await Usuario.findById(id)
            const updateResult = await Usuario.findOneAndUpdate({_id:id},{img:`/img/profile/${img}`})
            resolve(userData.img)
        } catch (e) {
            reject(e)
        }
    })
}
function updateUsername({username,id}){
    return new Promise(async (resolve, reject) => {
        try {
            const uniqueName = await Usuario.find({username})
            if(uniqueName === null || uniqueName.length <= 0|| uniqueName === ''){
                const updateResult = await Usuario.findOneAndUpdate({_id:id},{username})
                resolve('ok')
            }else{
                
                reject('usernameUse')
            }
        } catch (e) {
            reject(e)
        }
    })
}
function updatePassword({password,id}){
    return new Promise(async (resolve, reject) => {
        const saltRounds = randomNumber(10,25)
        bcrypt.hash(password, saltRounds,async (err, hash) => {
            try {
                if(err){
                    reject(err)
                }else{
                    const updateResult = await Usuario.findOneAndUpdate({_id:id},{password:hash})
                    console.log('waiterFinal')
                    resolve('ok')
                }
            } catch (e) {
                reject(e)
            }
        })
    })
}
function getMail(id){
    return new Promise(async (resolve, reject) => {
        try {
            const { username } = await Usuario.findById(id)
            if(username === null){
                reject('error')
            }else{
                resolve(username)
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    saveUser,
    loginUser,
    authUser,
    updateImg,
    updateUsername,
    updatePassword,
    getMail,
}