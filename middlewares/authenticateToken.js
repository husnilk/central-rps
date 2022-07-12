const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UsersModel = require('../models/users');

function authenticateToken(req, res, next) {

    dotenv.config();
    let secret = process.env.JWT_SECRET;

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, async (err, user) => {
        console.log(err)
        
        if (err) return res.sendStatus(403)

        req.user = user
        
        next()
    })
}

module.exports = authenticateToken;