const fs = require('fs');
const path = require('path');
function addErrorLog(error){
    return new Promise(async(resolve, reject) => {
        try {
            const errorContent = `${error.name}-${error.message}-${Date.now()} \n\n`
            fs.writeFile(path.join(__dirname,'./../../.logs'),errorContent, {flag:'a+'},err => {
                if(err){
                    reject(err)
                }else{
                    resolve('errorLoged')
                }
            })
        } catch (e) {
            console.error(e)
            reject(e)
        }
    })
}

module.exports = addErrorLog