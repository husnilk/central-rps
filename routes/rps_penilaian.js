var express = require('express');
const { QueryTypes } = require('sequelize');
var router = express.Router();

var authenticateToken = require('../middlewares/authenticateToken');
const CoursePlanAssessment = require('../models/course_plan_assessments');
var sequelize = require('../utils/connect')

router.get('/:rpsId/assessments/', authenticateToken, async function (req, res) {
    var rpsId = req.params.rpsId;
        var percentage = req.body.percentage;
        var name = req.body.name;
        var datetime = new Date().toISOString();
        
        if(rpsId == null || name == null || percentage == null ){
            return res.json({
                status: "400",
                message: "Field code, name dan CPL tidak boleh kosong",
                id: null,
                datetime: datetime
            });
        }
        try{
            let assessments = await CoursePlanAssessment.create({
                course_plan_id : rpsId,
                name: name,
                percentage: percentage
            });
            
            res.json({
                status: "200",
                message: "Data Komponen Penilaian berhasil ditambahkan",
                id: cpmk.id,
                datetime: datetime
            });
        }catch(error){
            console.log(error);
            res.json(error);
        }
    
});

/**
 * Tambah Komponen Penilaian
 */
router.post('/:rpsId/assessments', authenticateToken, async (req, res) => {
    let rpsId = req.params.rpsId;
    let course_name = req.params.name;
    let course_percentage = req.params.percentage;

    try{
        var assessments = await CoursePlanAssessment.create({

        });

        return res.json({
            status: "200",
            message: "Data CPMK berhasil ditambahkan",
            id: cpmk.id,
            datetime: datetime
        });
    }catch(error){

    }
    
});

module.exports = router;