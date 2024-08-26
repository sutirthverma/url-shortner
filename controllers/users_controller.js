const Users = require('../models/users_model');
const Urls = require('../models/url_model')
const {v4: uuidv4} = require('uuid');
const {
    setUser,
    getUser
} = require('../services/auth');

async function handleUserSignUp(req, res){
    const body = req.body;
    const allUrlsList = Urls.find({});

    const user = Users.create({
        username: body.username,
        email: body.email,
        password: body.password
    });

    return res.render('home', {
        allUrls: allUrlsList
    });
}

async function handleGetUserSignUpPage(req, res){
    return res.render('signup');
}

async function handleGetLoginPage(req, res){
    return res.render('login');
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    let message = 'Success Login';

    const user = await Users.findOne({password: password, email: email});
    console.log(user);
    if(user == null)
        return res.render('login', {
            error: 'Invalid username or password'
    });

    //const sessionId = uuidv4();
    const token = setUser(user);    
    res.cookie('uid', token);

    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleGetUserSignUpPage,
    handleUserLogin,
    handleGetLoginPage
}