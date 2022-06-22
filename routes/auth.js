const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const generateAccessToken = function(username){
    return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '1800s'});
}

router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    var datetime = new Date().toISOString();
    if(username == "username" && password == "password"){
        var token = generateAccessToken({username: username});
        var response = {
            message: "Login berhasil",
            token: token,
            datetime: datetime
        }
        res.json(response);
    }else{
        var response = {
            message: "Login gagal",
            datetime: datetime
        }
        res.json(response);
    }
});

router.post('/logout', function (req, res, next) {
    var datetime = new Date().toISOString();
    res.json({
        message: 'See you next time',
        datetime: datetime
    });
});




module.exports = router;