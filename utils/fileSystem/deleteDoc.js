const fs = require('fs');
const path = require('path')

function deleteDoc(pathDoc){
    return new Promise(async (resolve, reject) => {
        try {
            fs.unlink(path.join(__dirname, `../../public${pathDoc}`), (err) => {
                if(err){
                    reject(err)
                }
                resolve('delete')
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = deleteDoc