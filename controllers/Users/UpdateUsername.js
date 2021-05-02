const { updateUsername } = require('./../../models/User')

function UpdateUsername(obj){
    return new Promise(async (resolve, reject) => {
        try {
            if(obj.username.length >= 3 && obj.username.length <= 30){
                const modelResponse = await  updateUsername(obj)
                resolve(modelResponse)
            }else{
                reject('usernameInvalid')
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = UpdateUsername