const mongoose = require('mongoose')
const { Schema,model } = mongoose

function saveDocs(arrayObjs){ 
    return new Promise(async (resolve, reject) => {
        try {
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    saveDocs: saveDocs
}