const jwt = require('jsonwebtoken');
const secret = 'sutirth';

function setUser(user){
    //We had to parse and stringify the user object as it contains 
    //ObjectId type of mongodb which is not part of plain JS 

    const payload = {
        id: user._id.toString(),
        username: user.username,
        email: user.email
    };
    return jwt.sign(payload, secret);    
}

function getUser(token){
    console.log(`Tokennn ${token}`);
    if(!token) return null;

    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser
};