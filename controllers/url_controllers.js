const Url = require('../models/url_model');
const shortIdGen = require('short-id-gen');

async function handleGetAllURLs(req, res){
    const allUrls = await Url.find({});

    //return res.json(allUrls);
    return res.render('home');
}

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    const shortId = shortIdGen.generate();

    const shortUrl = Url.create({
        shortId: shortId,
        redirectURL: body.url,
        visitedHistory: []
    })

    return res.render('generated_url', {
        id: shortId
    });   
}

async function handleGetURL(req, res){
    const shortId = req.params.shortId;

    const entry = await Url.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory: {timestamp: Date.now()},
        }
    });

    console.log(entry);
    
    return res.redirect(entry.redirectURL);
}

async function handleGetAnalyticsOfUrl(req, res){
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId: shortId});

    //return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
    return res.render('analytics', {
        totalClicks: result.visitHistory.length
    });
}

module.exports = {
    handleGetAllURLs,
    handleGenerateNewShortURL,
    handleGetURL,
    handleGetAnalyticsOfUrl
}