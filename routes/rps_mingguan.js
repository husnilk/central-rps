var express = require('express');
const { QueryTypes } = require('sequelize');
var router = express.Router();
var authenticateToken = require('../middlewares/authenticateToken');
const CourseLo = require('../models/course_los');
const CoursePlanDetail = require('../models/course_plan_details');
const CoursePlanDetailAssessment = require('../models/course_plan_detail_assessments');
const CoursePlanDetailOutcome = require('../models/course_plan_detail_outcomes');
const CoursePlanDetailRef = require('../models/course_plan_detail_refs');
var sequelize = require('../utils/connect');

/**
* List CPMK
*/
router.get('/:rpsId/session/', authenticateToken, async (req, res) => {
    CoursePlanDetail.hasMany(CoursePlanDetailAssessment, { foreignKey: 'course_plan_detail_id', as: 'assessments'});
    CoursePlanDetailAssessment.belongsTo(CoursePlanDetail, { foreignKey: 'course_plan_detail_id', as: 'assessments'});
        
    CoursePlanDetail.hasMany(CoursePlanDetailRef, {foreignKey: 'course_plan_detail_id', as: 'references'});
    CoursePlanDetailRef.belongsTo(CoursePlanDetail, {foreignKey: 'course_plan_detail_id', as: 'references'});

    CoursePlanDetail.belongsToMany(CourseLo, {through: CoursePlanDetailOutcome, as: "los", sourceKey: "course_plan_detail_id", targetKey: "course_lo_id"});
    CourseLo.belongsToMany(CoursePlanDetail, {through: CoursePlanDetailOutcome, as: "los", sourceKey: "course_lo_id", targetKey: "course_plan_detail_id"});

    var rpsId = req.params.rpsId;
    
    //Get Course Objective
    try{
        var coursePlanDetails = await CoursePlanDetail.findAll({
            attributes: ['id', 'week', 'material', 'method', ['student_activity', 'student_exp']],
            where: {
                course_plan_id: coursePlan.id
            },
            include: ['los', 'assessments', 'references']
        });
        let dataCount = 0;
        if(coursePlanDetails != null){
            dataCount = coursePlanDetails.length;
        }else{
            coursePlanDetails = [];
        }
        console.log(coursePlanDetails);
        return res.json({
            count: dataCount,
            datetime: new Date().toISOString(),
            weekly: coursePlanDetails
        });
    }catch(error){
            console.log(error);
            res.json(error);
        }
        
    });
    
    /**
    * Create Pertemuan Mingguan 
    */
    router.post('/:rpsId/session', authenticateToken, async function (req, res) {
        let rpsId = req.params.rpsId;

        let week_no = req.body.req_no;
        let material = req.body.material;
        let method = req.body.method;
        let student_exp = req.body.student_exp;
        let los = req.body.los;
        let assessments = req.body.assessments;
        let refs = req.body.refs;
        
        if(week_no == null || material == null ){
            return res.json({
                status: "400",
                message: "Field minggu ke dan mater tidak boleh kosong",
                id: null,
                datetime: datetime
            });
        }
        try{
            let session = await CoursePlanDetail.create({
                course_plan: course_plan_id,
                week_no: week_no,
                method: method,
                student_exp: student_exp
            })

            if(session != null){
                los.every(async (obj) => {
                    await CoursePlanDetailOutcome.create({
                        course_lo_id: obj.id,
                        coures_plan_detail_id: session.id
                    });
                });

                assessments.every(async (assessment) => {
                    await CoursePlanDetailAssessment.create({
                        coures_plan_detail_id: session.id,
                        course_plan_assessment_id: assessment.id,
                        percentage: assessment.percentage
                    })
                });

                refs.every(async (ref) =>{
                    await CoursePlanDetailRef.create({
                        course_plan_detail_id: session.id,
                        course_plan_reference_id: ref.id,
                        course_plan_description: ref.description
                    })
                });
                
                res.json({
                    status: "200",
                    message: "Data Pertemuan Mingguan berhasil ditambahkan",
                    id: session.id,
                    datetime: new Date().toISOString()
                });
            }
        }catch(error){
            console.log(error);
            res.json(error);
        }
    });

    /**
* Update CPMK
*/
router.put('/:rpsId/session/:sessionId', authenticateToken, async (req, res) => {
    let rpsId = req.params.rpsId;
    let sessionId = req.params.sessionId;

    let week_no = req.body.req_no;
    let material = req.body.material;
    let method = req.body.method;
    let student_exp = req.body.student_exp;
    let los = req.body.los;
    let assessments = req.body.assessments;
    let refs = req.body.refs;

    const t = await sequelize.transaction();
    try{
        let session = await CoursePlanDetail.findOne({
            where:{
                course_plan_id: rpsId,
                id: sessionId
            }
        })
        if(session != null){
            session.week_no = week_no;
            session.material = material;
            session.method = method;
            session.student_exp = student_exp;

            await session.save();

            await sequelize.query('DELETE FROM course_plan_detail_outcomes WHERE course_plan_detail_id=:session_id', 
            {
                replacements: {
                    session_id: session_id
                },
                type: QueryTypes.DELETE
            });
            los.every(async (obj) => {
                await CoursePlanDetailOutcome.create({
                    course_lo_id: obj.id,
                    coures_plan_detail_id: session.id
                });
            });

            await sequelize.query('DELETE FROM course_plan_detail_assessments WHERE course_plan_detail_id=:session_id', 
            {
                replacements: {
                    session_id: session_id
                },
                type: QueryTypes.DELETE
            });
            assessments.every(async (assessment) => {
                await CoursePlanDetailAssessment.create({
                    coures_plan_detail_id: session.id,
                    course_plan_assessment_id: assessment.id,
                    percentage: assessment.percentage
                })
            });

            await sequelize.query('DELETE FROM course_plan_detail_refs WHERE course_plan_detail_id=:session_id', 
            {
                replacements: {
                    session_id: session_id
                },
                type: QueryTypes.DELETE
            });
            refs.every(async (ref) =>{
                await CoursePlanDetailRef.create({
                    course_plan_detail_id: session.id,
                    course_plan_reference_id: ref.id,
                    course_plan_description: ref.description
                })
            });

        res.json({
            status: "200",
            message: "Pertemuan Mingguan berhasil diupdate",
            id: session.id,
            datetime: new Date().toISOString()
        });
        }
        t.commit();
    }catch(error){
        console.log(error);
        t.rollback();
        return res.json(error);
    }
});

/**
* Delete CPMK
*/
router.delete('/:rpsId/session/:sessionId', authenticateToken, async (req, res) => {
    let rpsId = req.params.rpsId;
    let sessionId = req.params.sessionId;

    const t = await sequelize.transaction();
    try{
        let session = await CoursePlanDetail.findByPk(sessionId);
        await sequelize.query('DELETE FROM course_plan_detail_outcomes WHERE course_plan_detail_id=:session_id', 
        {
            replacements: {
                session_id: session_id
            },
            type: QueryTypes.DELETE
        });

        await sequelize.query('DELETE FROM course_plan_detail_assessments WHERE course_plan_detail_id=:session_id', 
        {
            replacements: {
                session_id: session_id
            },
            type: QueryTypes.DELETE
        });

        await sequelize.query('DELETE FROM course_plan_detail_refs WHERE course_plan_detail_id=:session_id', 
        {
            replacements: {
                session_id: session_id
            },
            type: QueryTypes.DELETE
        });
        
        session.destroy();

        t.commit();
        return res.json({
            status: "200",
            message: "Pertemuan Mingguan berhasil dihapus",
            id: session.id,
            datetime: new Date().toISOString()
        })
    }catch(error){
        console.log(error);
        await t.rollback();
        return res.json(error);
    }
});
    
module.exports = router;