const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

function authenticateToken(req, res, next) {

    dotenv.config();
    let secret = process.env.JWT_SECRET;

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, async (err, user) => {
        
        if (err) return res.sendStatus(403)

        req.user = user
        
        next()
    })
}

module.exports = authenticateToken;