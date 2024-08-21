const sessionIdToUserMap = new Map();

function setUser(id, user){
    sessionIdToUserMap.set(id, user);
    console.log('Setuppp');
    console.log(sessionIdToUserMap);
}

function getUser(id){
    console.log(sessionIdToUserMap);
    
    console.log('Get user id:' + sessionIdToUserMap.get(id));
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
};