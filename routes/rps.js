const express = require('express');
const sequelize = require('../utils/connect');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken')
const CoursePlan = require('../models/course_plans');
const Lecturer = require('../models/lecturers');
const { QueryTypes } = require('sequelize');

/**
 * List All RPS
 */
router.get('/', authenticateToken, async function (req, res, next) {
    var user = req.user;

    var lecturer = await Lecturer.findByPk(user.id);

    course_plans = await sequelize.query(
        'SELECT course_plans.* '+
        'FROM course_plans LEFT JOIN course_plan_lecturers ON course_plan_lecturers.course_plan_id=course_plans.id '+
        'lecturer_id = :lecturer_id',
    {
        replacements: { lecturer_id: lecturer.id},
        type: QueryTypes.SELECT
    })

    res.json(course_plans);
});

/**
 * Create new RPS
 */
// router.post('/', (req, res) => {

// });

/**
 * Show RPS Detail
 */
// router.get('/:rpsId', (req, res) => {

// });

/**
 * Edit RPS 
 */
// router.put('/:rpsId', (req, res) => {

// });

module.exports = router;