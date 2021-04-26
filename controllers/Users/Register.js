const schemaValidation = require('./../../utils/schemas/RegisterSchema')
const { saveUser } = require('./../../models/User')
function controllerRegister(obj){
    return new Promise(async (resolve,reject) => {
        try {
            if(Object.keys(obj).length <= 0){
                reject('dataNull')
            }else{
                const validationResult = await schemaValidation(obj)
                const modelResult = await saveUser(validationResult)
                resolve(modelResult)
            }
        }catch (e) {
            reject(e);
        }
    })
}

module.exports = controllerRegister