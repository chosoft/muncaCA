const express = require('express');
const router = express.Router();

router.get('/',async (req,res) => {
    try{
        res.render('recoveryPassword')
    }catch(err){
        res.render('error')
    }
})