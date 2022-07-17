var express = require('express');
const { QueryTypes } = require('sequelize');
var router = express.Router();

var authenticateToken = require('../middlewares/authenticateToken');
const CoursePlanAssessment = require('../models/course_plan_assessments');
const CoursePlanReference = require('../models/course_plan_references');
const Lecturer = require('../models/lecturers');
var sequelize = require('../utils/connect')

/**
 * List referensi 
 */
router.get('/:rpsId/refs/', authenticateToken, async function (req, res) {
    var user = req.user;
    let rpsId = req.params.rpsId;
    
    try {
        var lecturer = await Lecturer.findByPk(user.id);
        console.log(lecturer.id)
        var refs = await sequelize.query('SELECT '+
        'course_plan_references.id,' + 
        'course_plan_references.primary as category,' +
        'CONCAT(title,", ", `year`," ,",author," ,",publisher) AS `name` ' +
        'FROM course_plan_references '+
        'WHERE course_plan_id = :course_plan_id',
        {
            replacements: { course_plan_id: rpsId},
            type: QueryTypes.SELECT
        });
        
        console.log(refs);
    }catch(error){
        console.log("Ok");
    }
    if(refs == undefined){
        counts = 0;
        refs = {};
    }else{
        counts = refs.length;
    }
    var datetime = new Date().toISOString();
    var response = {
        counts: counts,
        datetime: datetime,
        refs : refs
    };
    
    res.json(response);
    
});

/**
* Tambah Referensi
*/ 
router.post('/:rpsId/refs', authenticateToken, async (req, res) => {
    let rpsId = req.params.rpsId;

    let course_plan_id = req.body.rps_id;
    let title = req.body.title;
    let author = req.body.author;
    let publisher = req.body.publisher;
    let year = req.body.year;
    let description = req.body.description;
    let primary = 1;
    
    if(title == null || year == null || author == null || publisher == null){
        return res.json({
            status: "400",
            message: "Judul, Pengarang, Penerbit dan tahun harus diisi",
            id: null,
            datetime: new Date().toISOString()
        })
    }
    
    try{
        var reference = await CoursePlanReference.create({
            course_plan_id: rpsId,
            title: title,
            author: author,
            publisher: publisher,
            year: year,
            type: 1,
            description: description,
            primary: primary
        });
        
        return res.json({
            status: "200",
            message: "Data Referensi berhasil ditambahkan",
            id: reference.id,
            datetime: new Date().toISOString()
        });
    }catch(error){
        console.log(error);
        return res.json(error);
    }
});

/**
 * Update Referensi
 */
router.put('/:rpsId/refs/:refId', authenticateToken, async (req, res) => {
    let refId = req.params.refId;
    let rpsId = req.params.rpsId;

    let reference_id = req.body.ref_id;
    let course_plan_id = req.body.rps_id;
    let title = req.body.title;
    let author = req.body.author;
    let publisher = req.body.publisher;
    let year = req.body.year;
    let description = req.body.description;
    let primary = 1; 
    
    if(title == null || year == null || author == null || publisher == null){
        return res.json({
            status: "400",
            message: "Judul, Pengarang, Penerbit dan tahun harus diisi",
            id: null,
            datetime: new Date().toISOString()
        })
    }
    
    try{
        var reference = await CoursePlanReference.findByPk(refId);
            reference.title = title;
            reference.author = author;
            reference.publisher = publisher;
            reference.year = year;
            reference.type = 1;
            reference.description = description;
            reference.primary = primary;
        await reference.save();

        return res.json({
            status: "200",
            message: "Data Referensi berhasil diupdate",
            id: reference.id,
            datetime: new Date().toISOString()
        });
    }catch(error){
        console.log(error);
        return res.json(error);
    }
});

/**
 * Destroy Referensi
 */
router.delete('/:rpsId/refs/:refId', authenticateToken, async (req, res) => {
    let refId = req.params.refId;
    let rpsId = req.params.rpsId;

    const t = await sequelize.transaction();
    try{
        await sequelize.query('DELETE FROM course_plan_detail_refs WHERE course_plan_reference_id = :reference_id', 
            {
                replacements: {
                    reference_id : refId
                },
                type: QueryTypes.DELETE
            });
        await sequelize.query('DELETE FROM course_plan_references WHERE id = :reference_id ', 
        {
            replacements: {
                reference_id: refId
            },
            type: QueryTypes.DELETE
        });
        t.commit();
        return res.json({
            status: "200",
            message: "Referensi berhasil dihapus",
            id: refId,
            datetime: new Date().toISOString()
        })
    }catch(error){
        console.log(error);
        await t.rollback();
        return res.json(error);
    }

});

module.exports = router;