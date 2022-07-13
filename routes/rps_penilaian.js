var express = require('express');
const { QueryTypes } = require('sequelize');
var router = express.Router();

var authenticateToken = require('../middlewares/authenticateToken');
const CoursePlanAssessment = require('../models/course_plan_assessments');
const Lecturer = require('../models/lecturers');
var sequelize = require('../utils/connect')

router.get('/:rpsId/assessments/', authenticateToken, async function (req, res) {
    var user = req.user;
    let rpsId = req.params.rpsId;
    
    try {
        var lecturer = await Lecturer.findByPk(user.id);
        console.log(lecturer.id)
        var assessments = await sequelize.query('SELECT '+
        'course_plan_assessments.id,' + 
        'course_plan_assessments.name,' +
        'course_plan_assessments.percentage ' +
        'FROM course_plan_assessments '+
        'WHERE course_plan_id = :course_plan_id',
        {
            replacements: { course_plan_id: rpsId},
            type: QueryTypes.SELECT
        });
        
        console.log(assessments);
    }catch(error){
        console.log("Ok");
    }
    if(assessments == undefined){
        counts = 0;
        assessments = {};
    }else{
        counts = assessments.length;
    }
    var datetime = new Date().toISOString();
    var response = {
        counts: counts,
        datetime: datetime,
        assessments : assessments
    };
    
    res.json(response);
    
});

/**
* Tambah Komponen Penilaian
*/
router.post('/:rpsId/assessments', authenticateToken, async (req, res) => {
    let rpsId = req.params.rpsId;
    let course_plan_id = req.body.course_plan_id;
    let name = req.body.name;
    let percentage = req.body.percentage;
    
    console.log(name, percentage);

    if(course_plan_id == null || name == null || percentage == null){
        return res.json({
            status: "400",
            message: "Nama dan Persentase harus diisi",
            id: null,
            datetime: new Date().toISOString()
        })
    }
    
    try{
        var assessment = await CoursePlanAssessment.create({
            course_plan_id: course_plan_id,
            name: name,
            percentage: percentage,
            flag: 1
        });
        
        return res.json({
            status: "200",
            message: "Data Komponen Penilaian berhasil ditambahkan",
            id: assessment.id,
            datetime: new Date().toISOString()
        });
    }catch(error){
        console.log(error);
        return res.json(error);
    }
});

/**
 * Update Komponen Penilaian
 */
router.put('/:rpsId/assessments/:assessmentId', authenticateToken, async (req, res) => {
    let assessmentId = req.body.assessmentId;
    let rpsId = req.body.rpsId;
    let name = req.body.name;
    let percentage = req.body.percentage;
    console.log(req.params);
    
    console.log(name, percentage);

    if(name == null || percentage == null){
        return res.json({
            status: "400",
            message: "Nama dan Persentase harus diisi",
            id: null,
            datetime: new Date().toISOString()
        })
    }
    
    try{
        var assessment = await CoursePlanAssessment.findByPk(assessmentId);
        assessment.name = name;
        assessment.percentage = percentage;
        await assessment.save();

        return res.json({
            status: "200",
            message: "Data Komponen Penilaian berhasil diupdate",
            id: assessment.id,
            datetime: new Date().toISOString()
        });
    }catch(error){
        console.log(error);
        return res.json(error);
    }
});

/**
 * Destroy Komponen Penilaian
 */
router.delete('/:rpsId/assessments/:assessmentId', authenticateToken, async (req, res) => {
    let assessmentId = req.params.assessmentId;
    let rpsId = req.params.rpsId;

    console.log(assessmentId);

    const t = await sequelize.transaction();
    try{
        await sequelize.query('DELETE FROM course_plan_detail_assessments WHERE course_plan_assessment_id = :assessment_id', 
            {
                replacements: {
                    assessment_id: assessmentId
                },
                type: QueryTypes.DELETE
            });
        await sequelize.query('DELETE FROM course_plan_assessments WHERE id = :assessment_id ', 
        {
            replacements: {
                assessment_id: assessmentId
            },
            type: QueryTypes.DELETE
        });
        t.commit();
        return res.json({
            status: "200",
            message: "Komponen penilaian berhasil dihapus",
            id: assessmentId,
            datetime: new Date().toISOString()
        })
    }catch(error){
        console.log(error);
        await t.rollback();
        return res.json(error);
    }

});

module.exports = router;