const mongoose = require('mongoose')
const { Schema,model } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String},
    rol:{required:true,type:String,default:'user'},
    img:{required:true,type:String,default:'/profile/default.svg'},
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
                reject('errorLogin')
            }else{
                const passwordVerification = await bcrypt.compare(password, userData.password)
                if(passwordVerification){
                    const idToken = userData._id
                    resolve(idToken)
                }else{
                    reject('errorLogin')
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
module.exports = {
    saveUser,
    loginUser,
    authUser,
}