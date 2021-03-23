const express = require('express');
const router = express.Router();

const db = require('../db');
const auth = require('../middleware/auth');

//create a course
router.post('/course', auth, async(req,res)=>{
    const {course_id, course_title, course_description, course_price, course_rating} = req.body;
    if(!course_title || !course_description || !course_price || !course_rating || !course_id){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const courseWithId = await db.query("SELECT * FROM courses WHERE course_id = $1",[course_id]);
        if(courseWithId.rows.length){
            return res.status(422).json({error: "Course already exits with this ID. You could update that!!"});
        }
        const {rows} = await db.query("INSERT INTO courses (course_id, course_title, course_description, course_price, course_rating," + 
                                        " course_created_by_user_id) values($1, $2, $3, $4, $5, $6)",
                                        [course_id, course_title, course_description, course_price, course_rating, req.currentUser.user_id]);

        res.status(200).json({message: "Course Added Successfully", course: rows[0] });
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Some Error occured !! Please Check all of your Inputs"});
    }
});

//get all courses
router.get('/course', auth, async(req, res)=>{
    try{
        const{rows} = await db.query("SELECT c.course_id, c.course_title, c.course_description, c.course_price, c.course_rating," +
                                    " crt.first_name AS created_by_first_name, crt.last_name AS created_by_last_name," +
                                    " updt.first_name AS updated_by_first_name, updt.last_name AS updated_by_last_name" +
                                    " FROM (courses c INNER JOIN users crt ON c.course_created_by_user_id = crt.user_id)" +
                                    " LEFT JOIN users updt ON c.course_updated_by_user_id = updt.user_id");
        if(!rows.length){
            return res.status(404).json({error: "No Course Found"});
        }
        res.status(200).json({course: rows});
    }catch(err){
        res.status(500).json({error: "Some Error occured"});
    }
});

//get a course
router.get('/course/:id', auth, async(req,res)=>{
    try{
        const {rows} = await db.query("SELECT course_id, course_title, course_description, course_price, course_rating FROM courses where course_id = $1", [parseInt(req.params.id)]);
        if(!rows.length){
            return res.status(404).json({error: "Course Not Found"});
        }
        res.status(200).json(rows[0]);
    }catch(err){
        res.status(500).json({error: "Some Error occured"});
    }
});

//update a course
router.patch('/course/:id', auth, async(req, res)=>{
    const {course_id, course_title, course_description, course_price, course_rating} = req.body;
    if(!course_title || !course_description || !course_price || !course_rating || !course_id){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        if(parseInt(req.params.id) !== course_id){
            const{rows} = await db.query('SELECT * FROM courses where course_id = $1', [course_id]);
            if(rows.length){
                return res.status(422).send({error: "There is a course with this ID !!"});
            }
        }
        const {rows} = await db.query("UPDATE courses SET course_id = $1, course_title = $2, course_description = $3, course_price = $4,"+
                                    " course_rating = $5, course_updated_by_user_id = $6 WHERE course_id = $7 RETURNING *",
                                    [course_id, course_title, course_description, course_price, course_rating, req.currentUser.user_id, req.params.id]);
        if(!rows.length){
            return res.status(404).json({error: "Course Not Found !! Couldn't Update"});
        }
        res.status(200).json({message: "Course Updated Successfully"}); 
    }catch(err){
        res.status(422).send({error: "Error Occured !!"});
    }
   
});

module.exports = router;        