const { loginUser } = require('./../../models/User')

function controllerLogin(obj){
    return new Promise(async (resolve, reject) => {
        try {
            if(Object.keys(obj).length <= 0){
                reject({msg:'dataNull',programatedError:true})
            }else{
                const modelResponse = await loginUser(obj)
                resolve(modelResponse)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controllerLogin