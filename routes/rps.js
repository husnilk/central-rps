const express = require('express');
const sequelize = require('../utils/connect');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken')
const Lecturer = require('../models/lecturers');
const { QueryTypes } = require('sequelize');
const Course = require('../models/courses');
const CoursePlan = require('../models/course_plans');

/**
* List All RPS
*/
router.get('/', authenticateToken, async function (req, res, next) {
    var user = req.user;
    try {
        var lecturer = await Lecturer.findByPk(user.id);
        console.log(lecturer.id)
        var course_plans = await sequelize.query(
            'SELECT '+
            'course_plans.id,' + 
            'course_plans.code,' +
            'course_plans.name,' +
            'course_plans.semester,' +
            'course_plans.rev,' +
            'course_plans.created_at,' + 
            'true as editable ' +
            'FROM course_plans LEFT JOIN course_plan_lecturers ON course_plan_lecturers.course_plan_id=course_plans.id '+
            'WHERE lecturer_id = :lecturer_id',
            {
                replacements: { lecturer_id: lecturer.id},
                type: QueryTypes.SELECT
            });
            
            console.log(course_plans);
        }catch(error){
            console.log("Ok");
        }
        if(course_plans == undefined){
            counts = 0;
            rps = {};
        }else{
            counts = course_plans.length;
            rps = course_plans;
        }
        var datetime = new Date().toISOString();
        var response = {
            counts: counts,
            datetime: datetime,
            rps: rps
        };
        
        res.json(response);
    });
    
    /**
    * Create new RPS
    */
    router.post('/', authenticateToken, async (req, res) => {
        
        var course_id = req.body.course_id;
        try{
            
            var course = await Course.findByPk(course_id);
            var revNumber = 0;
            console.log(course);
            if(course){
                var qres = await sequelize.query('SELECT max(rev) as rev FROM course_plans WHERE course_id=:course_id GROUP BY course_id', {
                    replacements: {
                        course_id: course_id
                    },
                    type: QueryTypes.SELECT
                });
                console.log(qres[0].rev);
                if(qres[0].rev == undefined){
                    revNumber = 0;
                }else{
                    revNumber = qres[0].rev + 1;
                }
                
                var coursePlan = await CoursePlan.create({
                    course_id: course.id,
                    name: course.name,
                    code: course.code,
                    rev: revNumber,
                    alias_name: course.alias_name,
                    credit: course.credit,
                    semester: course.semester,
                    mandatory: course.mandatory,
                    description: course.description,
                    created_by: req.user.id
                });
                if(coursePlan){
                    var datetime = new Date().toISOString();
                    var response = {
                        status: "created",
                        message: "RPS berhasil dibuat",
                        rps_id: coursePlan.id,
                        datetime: datetime
                    };
                    res.json(response);
                }
            }
        }catch(error){
            console.log(error);
        }
    });
    
    /**
    * Show RPS Detail
    */
    router.get('/:rpsId', authenticateToken, async (req, res) => {
        var rpsId = req.params.rpsId;
        console.log(rpsId);

        var coursePlan = await CoursePlan.findByPk(rpsId);


        res.json({});
    });
    
    /**
    * Edit RPS 
    */
    router.put('/:rpsId', authenticateToken, async (req, res) => {
        var rpsId = req.params.rpsId;
        console.log(rpsId);

        res.json({});
    });
    
    module.exports = router;