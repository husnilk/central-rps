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
router.put('/:rpsId/cpmk/:cpmkId', authenticateToken, async (req, res) => {
    let rpsId = req.params.rpsId;
    let cpmkId = req.params.cpmkId;

    const t = await sequelize.transaction();
    try{
        let cpmk = await CourseLo.findOne({
            where:{
                course_plan_id : rpsId,
                id: cpmkId
            }
        });
        if(cpmk != null){
            cpmk.code = req.body.code;
            cpmk.name = req.body.name;
            await cpmk.save();

            await sequelize.query('DELETE FROM course_lo_details WHERE course_lo_id=:course_lo_id', 
            {
                replacements: {
                    course_lo_id: cpmkId
                },
                type: QueryTypes.DELETE
            });
            let clo_ids = req.body.clo_ids;
            clo_ids.every(async (id) => {
                await CourseLoDetail.create({
                    course_lo_id: cpmkId,
                    curriculum_lo_id: id
                });
            });
        res.json({
            status: "200",
            message: "CPMK berhasil diupdate",
            id: null,
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
router.delete('/:rpsId/cpmk/:cpmkId', authenticateToken, async (req, res) => {
    let rpsId = req.params.rpsId;
    let cpmkId = req.params.cpmkId;

    const t = await sequelize.transaction();
    try{
        await sequelize.query('DELETE FROM course_lo_details WHERE course_lo_id=:course_lo_id', 
            {
                replacements: {
                    course_lo_id: cpmkId
                },
                type: QueryTypes.DELETE
            });
        await sequelize.query('DELETE FROM course_plan_detail_outcomes WHERE course_lo_id = :course_lo_id', 
        {
            replacements: {
                course_lo_id: cpmkId
            },
            type: QueryTypes.DELETE
        });
        await sequelize.query('DELETE FROM course_los WHERE id=:course_lo_id', 
        {
            replacements: {
                course_lo_id: cpmkId
            },
            type: QueryTypes.DELETE
        });
        t.commit();
        return res.json({
            status: "200",
            message: "CPMK berhasil dihapus",
            id: null,
            datetime: new Date().toISOString()
        })
    }catch(error){
        console.log(error);
        await t.rollback();
        return res.json(error);
    }
});
    
module.exports = router;