function auth(req, res, next) {
    return new Promise(async (resolve, reject) => {
        try {
            const id = req.session.id
            const verify = id ? true : false
            if(verify) {
                
            }else{
                res.send('notUser')
            }
        } catch (e) {
            res.send('notUser')
        }
    })
}