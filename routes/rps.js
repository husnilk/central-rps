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
        
        var datetime = new Date().toISOString();
        var response = {
            counts: course_plans.length,
            datetime: datetime,
            rps: course_plans
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
            console.log(course);
            if(course){
                const course_plans = await course.getCoursePlans();
            }
        
        }catch(error){
            console.log(error);
        }
        res.json(course);
    });
    
    /**
    * Show RPS Detail
    */
    router.get('/:rpsId', (req, res) => {
        
    });
    
    /**
    * Edit RPS 
    */
    router.put('/:rpsId', (req, res) => {
        
    });
    
    module.exports = router;