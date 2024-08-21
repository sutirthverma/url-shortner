const {
    getUser
} = require('../services/auth')

async function restrictToLoggedInUserOnly(req, res, next){
    const userId = req.cookies?.uid;
    let user = getUser(userId);
    console.log(userId);    
    console.log(user);
    

    if(!userId || !user)
        return res.redirect('/user/login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const userId = req.cookies?.uid;
    let user = getUser(userId);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}