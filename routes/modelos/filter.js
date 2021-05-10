const express = require('express');
const router = express.Router()

const GetFilter = require('./../../controllers/Modelos/GetFilter')

const auth = require('./../../utils/auth/auth')

router.get('/:modelo',auth, async (req, res) => {
    try {
        const modelo = req.params.modelo
        const verification = modelo ? true : false
        if(verification && modelo.length > 0){
            const controllerResponse = await GetFilter(modelo)
            if(controllerResponse.isNull){
                res.redirect('/modelos')
            }else{
                res.render('viewModelos',{...controllerResponse,renderInfo: req.renderData})
            }
        }else{
            res.redirect('/modelos')
        }
    } catch (e) {
        res.redirect('/modelos')
    }
})

module.exports = router