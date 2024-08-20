const Users = require('../models/users_model');
const {v4: uuidv4} = require('uuid');

async function handleUserSignUp(req, res){
    const body = req.body;

    const user = Users.create({
        username: body.username,
        email: body.email,
        password: body.password
    });

    return res.render('home');
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

    const sessionId = uuidv4();

    return res.render('home');    
}

module.exports = {
    handleUserSignUp,
    handleGetUserSignUpPage,
    handleUserLogin,
    handleGetLoginPage
}