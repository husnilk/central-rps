const express = require('express');
const sequelize = require('../utils/connect');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken')
const Lecturer = require('../models/lecturers');
const { QueryTypes } = require('sequelize');
const Course = require('../models/courses');
const CoursePlan = require('../models/course_plans');
const CoursePlanDetail = require('../models/course_plan_details');
const CoursePlanAssessment = require('../models/course_plan_assessments');
const CoursePlanDetailAssessment = require('../models/course_plan_detail_assessments');
const CoursePlanDetailRef = require('../models/course_plan_detail_refs');

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
        CoursePlanDetail.hasMany(CoursePlanDetailAssessment, { foreignKey: 'course_plan_detail_id', as: 'assessments'});
        CoursePlanDetailAssessment.belongsTo(CoursePlanDetail, { foreignKey: 'course_plan_detail_id', as: 'assessments'});
        
        CoursePlanDetail.hasMany(CoursePlanDetailRef, {foreignKey: 'course_plan_detail_id', as: 'references'});
        CoursePlanDetailRef.belongsTo(CoursePlanDetail, {foreignKey: 'course_plan_detail_id', as: 'references'});

        var rpsId = req.params.rpsId;
        var resObject = null;
        var creator = {
            creator_id: '-',
            creator_name: '-',
            creator_regno: '-'
        };
        var validator = {
            validator_id : '-',
            validator_name: '-',
            validator_regno: '-'
        }
        try{
            var coursePlan = await CoursePlan.findByPk(rpsId);
            if(coursePlan){
                // Get Creator
                if(coursePlan.created_by != null){
                    lecturerCreator = await Lecturer.findByPk(coursePlan.created_by);
                    if(lecturerCreator != null){
                        creator.creator_id = lecturerCreator.id,
                        creator.creator_name = lecturerCreator.name,
                        creator.creator_regno = lecturerCreator.nip
                    }
                }
                // Get Validator
                if(coursePlan.validator_by != null){
                    lecturerValidator = await Lecturer.findByPk(coursePlan.validated_by);
                    if(lecturerValidator != null){
                        validator.validator_id = lecturerValidator.id,
                        validator.validator_name = lecturerValidator.name,
                        validator.validator_regno = lecturerValidator.nip
                    }
                }
                // Get Learning Objectives
                var curriculumLos = await sequelize.query(
                    'SELECT ' +
                    'curriculum_los.id, '+
                    'curriculum_los.code, '+
                    'curriculum_los.name AS curriculum_lo_name '+
                    'FROM curriculum_los '+
                    'LEFT JOIN course_lo_details ON course_lo_details.curriculum_lo_id = curriculum_los.id '+
                    'LEFT JOIN course_los ON course_lo_details.course_lo_id = course_los.id '+
                    'WHERE course_los.course_plan_id = :course_plan_id '+
                    'GROUP BY curriculum_los.id ' +
                    'ORDER BY curriculum_los.code',{
                        replacements: {
                            course_plan_id: coursePlan.id
                        },
                        type: QueryTypes.SELECT 
                    });
                    //Get Course Objective
                    var courseLos = await sequelize.query(
                        'SELECT '+
                        'course_los.id AS id, '+
                        'course_los.name AS `lo_name`, '+
                        'course_los.code AS `code`' +
                        'FROM '+
                        'course_los '+
                        'WHERE course_los.course_plan_id = :course_plan_id '+
                        'ORDER BY course_los.id',
                        {
                        replacements: {
                            course_plan_id: coursePlan.id
                        },
                        type: QueryTypes.SELECT 
                    });
                    //Get References
                    var courseReferences = await sequelize.query(
                        'SELECT ' +
                        'CONCAT(title,", ", `year`," ,",author," ,",publisher) AS `name`, ' +
                        '`primary` AS `primary` ' +
                        'FROM course_plan_references ' +
                        'WHERE course_plan_id = :course_plan_id '+
                        'ORDER BY course_plan_references.`primary`',{
                        replacements: {
                            course_plan_id: coursePlan.id
                        },
                        type: QueryTypes.SELECT 
                    });

                    // Get Assessments
                    var courseAssessments = await sequelize.query(
                        'SELECT `id` AS `id`, `name` AS `name`, `percentage` AS `percentage` '+
                        'FROM course_plan_assessments '+
                        'WHERE course_plan_id = :course_plan_id',{
                        replacements: {
                            course_plan_id: coursePlan.id
                        },
                        type: QueryTypes.SELECT 
                    });
                    // Get Weekly Plan

                    var coursePlanDetails = await CoursePlanDetail.findAll({
                        attributes: ['id', 'week', 'material', 'method', ['student_activity', 'student_exp']],
                        where: {
                            course_plan_id: coursePlan.id
                        },
                        include: ['assessments', 'references']
                    });
                    console.log(coursePlanDetails);

                    resObject = {
                        course_id: coursePlan.course_id,
                        course_code: coursePlan.code,
                        course_name: coursePlan.name,
                        course_credit: coursePlan.credit,
                        course_desc: coursePlan.description,
                        course_rev: coursePlan.rev,
                        course_semester: coursePlan.semester,
                        course_material: coursePlan.material,
                        course_created_at: coursePlan.created_at,
                        course_creator: creator,
                        course_validated_at: coursePlan.validated_at,
                        course_validator: validator,
                        curriculum_lo: curriculumLos,
                        course_lo: courseLos,
                        course_references: courseReferences,
                        course_assessments: courseAssessments,
                        course_plans: coursePlanDetails
                    }
                };
                res.json(resObject);
            }catch(error){
                console.log(error);
                res.json(error);
            }
            
        });
        
        /**
        * Edit RPS 
        */
        router.put('/:rpsId', authenticateToken, async (req, res) => {
            var rpsId = req.params.rpsId;

            var datetime = new Date().toISOString();
            var body = req.body;

            if(body.semester == null || body.credit == null || body.description == null || body.material == null){
                res.json({
                    status: '400',
                    message: "Semua field harus diisi",
                    rps_id: rpsId,
                    datetime: datetime
                });
                return 0;
            }
            try{
            var coursePlan = await CoursePlan.findByPk(rpsId);
            
            if(coursePlan != null){
                coursePlan.credit = req.body.credit;
                coursePlan.semester = req.body.semester;
                coursePlan.description = req.body.description;
                coursePlan.material = req.body.material;
                await coursePlan.save();

                res.json({
                    status: '200',
                    message: "RPS berhasil diupdate",
                    rps_id: rpsId,
                    datetime: datetime
                })
            }

            }catch(error){
                res.json(error);
            }
            
        });
        
        module.exports = router;