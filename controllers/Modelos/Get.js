const { getModels  } = require('./../../models/Modelos')

function GetController(){
    return new Promise(async (resolve, reject) => {
        try {
            const modelosResponse = await getModels()            
            if(modelosResponse === null || modelosResponse.length <=0){
                resolve({isNull: true,modelos: modelosResponse})
            }else{
                resolve({isNull: false,modelos: modelosResponse})
            }
        } catch (e) {
            reject(e);
        }
    })    
}

module.exports = GetController