function notFound(req,res){
    let contentType = req.get('content-type') ? req.get('content-type').substring(0,req.get('content-type').indexOf(';')) : 'html'

    if(contentType === 'html'){
        res.status(404).render('404')
    }else{
        res.status(404).send('404 not Found')
    }
}

module.exports = notFound