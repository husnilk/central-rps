const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const generateAccessToken = function(username){
    return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '1800s'});
}

router.post('/login', async function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    //Get User data from database
    var user = await User.findOne({
        where:{
            username: username
        }
    });
    
    //Check user login
    var datetime = new Date().toISOString();
    bcrypt.compare(password, user.password)
    .then( (result) => {
        if(result == true){
            var token = generateAccessToken({username: username, id: user.id});
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
    })

});

router.post('/logout', function (req, res, next) {
    var datetime = new Date().toISOString();
    res.json({
        message: 'See you next time',
        datetime: datetime
    });
});

module.exports = router;