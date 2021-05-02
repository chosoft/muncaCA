const { updateImg } = require('./../../models/User')
const deleteImg = require('./../../utils/fileSystem/deleteDoc')
function ControllerUpdateImg(obj){
    return new Promise(async (resolve, reject) => {
        try {
            const updateResponse = await updateImg(obj)
            if(updateResponse === '/img/profile/default.svg'){
                resolve('ok')
            }else{
                const deleteImgResponse = await deleteImg(updateResponse)
                resolve('ok')
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = ControllerUpdateImg