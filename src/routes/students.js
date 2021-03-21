const express = require('express');
const router = express.Router();

const db = require('../db');
const auth = require('../middleware/auth');

//create a student
router.post('/student', auth, async(req, res)=>{
    const {name,
        student_id,
        grade_level,
        university_name,
        phone_number,
        email,
        address,
        city,
        country} = req.body;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test( email );
    if(!isValid){
        return res.status(422).json({error: "INVALID EMAIL !!"});
    }
    if(!name || !student_id || !grade_level || !university_name || !phone_number || !email || !address || !city || !country){
        return res.status(422).json({error: "Please add all fields"});
    }
    
    try{
        const studentWithId = await db.query("SELECT * FROM students WHERE student_id = $1",[student_id]);
        if(studentWithId.rows.length){
            return res.status(422).json({error: "Student already exits with this ID !!"});
        }
        const studentWithEmail = await db.query("SELECT * FROM students WHERE email = $1",[email]);
        if(studentWithEmail.rows.length){
            return res.status(422).json({error: "Student already exits with this Email !!"});
        }

        const {rows} = await db.query("INSERT INTO students (student_id, name, grade_level, university_name, phone_number, email, address, city, "+
                                    "country, student_created_by_user_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
                                    [student_id, name, grade_level, university_name, phone_number, email, address, city, country,  req.currentUser.user_id]);
        if(!rows.length){
            return res.status(500).json({error: "Some Error occured"});
        }
        res.status(200).json({message: "Student Added Successfully", student: rows[0] });
    }catch(err){
        res.status(500).json({error: "Some Error occured. Please Check all of your Inputs"});
    }
});

//update a student
router.patch('/student/:id', auth, async(req, res)=>{
    const {name,
        student_id,
        grade_level,
        university_name,
        phone_number,
        email,
        address,
        city,
        country} = req.body;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test( email );
    if(!isValid){
        return res.status(422).json({error: "INVALID EMAIL !!"});
    }
    if(!name || !student_id || !grade_level || !university_name || !phone_number || !email || !address || !city || !country){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const check = await db.query("SELECT * FROM students WHERE student_id = $1",[req.params.id]);
        if(!check.rows.length){
            return res.status(404).json({error: "No Student Found"});
        }
        if(parseInt(req.params.id) !== student_id){
            const {rows} = await db.query("SELECT * FROM students WHERE student_id = $1",[student_id]);
            if(rows.length){
                return res.status(422).json({error: "Another student already exits with this ID !!"});
            }
        }
        const {rows} = await db.query("SELECT * FROM students WHERE email = $1",[email]);
        if(rows.length){
            if(rows[0].student_id !== parseInt(req.params.id) ){
                return res.status(422).json({error: "Another student already exits with this Email !!"});
            }
        }
        const newStudent = await db.query("UPDATE students SET student_id = $1, name = $2, grade_level = $3, university_name = $4, "+
                                    " phone_number = $5, email = $6, address = $7, city = $8, country = $9, "+
                                    " student_updated_by_user_id = $10 WHERE student_id = $11 RETURNING *",
                                    [student_id, name, grade_level, university_name, phone_number, email, address, city, country,  req.currentUser.user_id, req.params.id]);
        if(!newStudent.rows.length){
            return res.status(500).json({error: "Some Error occured!!"});
        }
        res.status(200).json({message: "Student Updated Successfully", student: newStudent.rows[0] });
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Some Error occured"});
    }
});

//get all students
router.get('/student', auth, async(req, res)=>{
    try{
        const {rows} = await db.query("SELECT s.student_id, s.name, s.grade_level, s.university_name, s.phone_number, s.email, "+
                                    "s.address, s.city, s.country, crt.first_name AS created_by_first_name, crt.last_name AS created_by_last_name, "+
                                    "updt.first_name AS updated_by_first_name, updt.last_name AS updated_by_last_name FROM " +
                                    "(students s INNER JOIN users crt ON s.student_created_by_user_id = crt.user_id) "+
                                    "LEFT JOIN users updt ON s.student_updated_by_user_id = updt.user_id" );
                                    
        if(!rows.length){
            return res.status(404).json({error: "No Student Found"});
        }
        res.status(200).json({students: rows});
    }catch(err){
        res.status(500).json({error: "Some Error occured"});
    }
});

//get a student
router.get('/student/:id', auth, async(req, res)=>{
    try{
        const {rows} = await db.query("SELECT * FROM students where student_id = $1", [req.params.id]);
        if(!rows.length){
            return res.status(404).json({error: "Student Not Found"});
        }
        res.status(422).json(rows[0]);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Some Error occured"});
    }
});

module.exports = router;