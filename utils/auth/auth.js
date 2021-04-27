const { authUser } = require('./../../models/User')
function auth(req, res, next) {
    return new Promise(async (resolve, reject) => {
        try {
            const id = req.session.token
            const verify = id ? true : false
            if(verify) {
                const auth = await authUser(id)
                if(auth.auth){
                    req.renderData = auth.renderData
                    next()
                }else{
                    let contentType = req.get('content-type') ? req.get('content-type').substring(0,req.get('content-type').indexOf(';')) : 'html'
                    if(contentType === 'html'){
                        res.redirect('/')
                    }else{
                        res.send('notAuth')
                    }
                }
            }else{
                let contentType = req.get('content-type') ? req.get('content-type').substring(0,req.get('content-type').indexOf(';')) : 'html'
                if(contentType === 'html'){
                    res.redirect('/')
                }else{
                    res.send('notUser')
                }
            }
        } catch (e) {
            let contentType = req.get('content-type') ? req.get('content-type').substring(0,req.get('content-type').indexOf(';')) : 'html'
            if(contentType === 'html'){
                res.redirect('/')
            }else{
                res.send('notUser')
            }
        }
    })
}

module.exports = auth