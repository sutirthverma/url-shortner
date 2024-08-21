const express = require('express');
const router = express.Router();
const Urls = require('../models/url_model');


router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/url/login');

    const allUrls = await Urls.find({createdBy: req.user._id});
    console.log('all urslss' + allUrls);
    
    return res.render('home', {
        urls: allUrls
    });    
})


module.exports = router;