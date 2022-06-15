var express = require('express');
var router = express.Router();


router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    var datetime = new Date().toISOString();
    if(username == "username" && password == "password"){
        var response = {
            message: "Login berhasil",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
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