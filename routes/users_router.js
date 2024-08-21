const express = require('express');
const Router = express.Router();
const {
    handleUserSignUp,
    handleGetUserSignUpPage,
    handleUserLogin,
    handleGetLoginPage,
} = require('../controllers/users_controller');

Router.route('/signup')
.get(handleGetUserSignUpPage)
.post(handleUserSignUp);

Router.route('/login')
.get(handleGetLoginPage)
.post(handleUserLogin);

module.exports = Router;