var express = require('express');
var router = express.Router();

router.get('/:rpsId/assessments/', function (req, res) {
    var rpsId = req.params.rpsId;

    console.log(rpsId);
    res.json(rpsId);
});

module.exports = router;