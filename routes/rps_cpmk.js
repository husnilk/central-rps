var express = require('express');
const { QueryTypes } = require('sequelize');
var router = express.Router();
var authenticateToken = require('../middlewares/authenticateToken');
const CourseLo = require('../models/course_los');
const CourseLoDetail = require('../models/course_lo_details');
var sequelize = require('../utils/connect');

/**
* List CPMK
*/
router.get('/:rpsId/cpmk/', authenticateToken, async (req, res) => {
    var rpsId = req.params.rpsId;
    
    //Get Course Objective
    try{
        var courseLos = await sequelize.query(
            'SELECT '+
            'course_los.id AS id, '+
            'course_los.code AS `code`, ' +
            'course_los.name AS `lo_name` '+
            'FROM '+
            'course_los '+
            'WHERE course_los.course_plan_id = :course_plan_id '+
            'ORDER BY course_los.id',
            {
                replacements: {
                    course_plan_id: rpsId
                },
                type: QueryTypes.SELECT 
            });
            console.log(courseLos);
            
            var count = 0;
            if(courseLos != null){
                count = courseLos.length; 
            }
            
            var datetime = new Date().toISOString();
            
            res.json({
                count: count,
                datetime: datetime,
                cpmk: courseLos
            });
        }catch(error){
            console.log(error);
            res.json(error);
        }
        
    });
    
    /**
    * Create New CPMK
    */
    router.post('/:rpsId/cpmk', authenticateToken, async function (req, res) {
        var rpsId = req.params.rpsId;
        var code = req.body.code;
        var name = req.body.name;
        var clo_ids = req.body.clo_ids;
        var datetime = new Date().toISOString();
        
        if(code == null || name == null || clo_ids.length <= 0 ){
            return res.json({
                status: "400",
                message: "Field code, name dan CPL tidak boleh kosong",
                id: null,
                datetime: datetime
            });
        }
        try{
            var cpmk = await CourseLo.create({
                course_plan_id: rpsId,
                type: 0,
                code: code,
                name: name,
                parent_id: null
            });

            if(cpmk != null){
                clo_ids.every(async (id) => {
                    await CourseLoDetail.create({
                        course_lo_id: cpmk.id,
                        curriculum_lo_id: id
                    });
                });
                
                res.json({
                    status: "200",
                    message: "Data CPMK berhasil ditambahkan",
                    id: cpmk.id,
                    datetime: datetime
                    
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
router.put('/:cpmkId', async (req, res) => {
    
});

/**
* Delete CPMK
*/
router.delete('/:rpsId/cpmk/:cpmkId', async (req, res) => {

    CourseLo.belongsToMany();

    var rpsId = req.params.rpsId;
    var cpmkId = req.params.cpmkId;




});
    
    module.exports = router;