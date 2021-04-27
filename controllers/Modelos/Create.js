const schemaAuth =  require('./../../utils/schemas/ModelosSchema')
const { saveModelo } = require('./../../models/Modelos')
function ControllerCreate(obj){
    return new Promise(async (resolve, reject) => {
        try {
            if(Object.keys(obj).length <= 0){
                reject('dataNull')
            }else{
                const schemaResult = await schemaAuth(obj)
                const modeloResult = await saveModelo(obj)
                resolve(modeloResult)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = ControllerCreate