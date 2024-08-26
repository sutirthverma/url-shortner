const {
    getUser
} = require('../services/auth')

async function restrictToLoggedInUserOnly(req, res, next){
    const userId = req.headers['authorization'];
    if(!userId) return res.redirect('/user/login');
    const token = userId.split('Bearer ')[1];

    let user = getUser(token);

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    console.log(req.headers);
    
    const userId = req.headers['authorization'];
    const token = userId.split('Bearer ')[1];
    
    let user = getUser(token);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}