function managerErros(e,arrayErrors) {
    return new Promise((resolve,reject) => {
        if(arrayErrors.length <=0){
            resolve('serverError')
        }else{
            arrayErrors.forEach((error,index) => {
                if(error === e){
                    resolve(e)
                }else{
                    if(index+1 === arrayErrors.length){
                        resolve('serverError')
                    }else{

                    }
                }
            })
        }
    })
}

module.exports = managerErros