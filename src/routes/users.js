const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db');
const auth = require('../middleware/auth');

//signup/create
router.post('/signup', async(req, res)=>{
    const {first_name, last_name, email, password} = req.body;

    if(!first_name || !last_name || !email || !password){
        return res.status(422).json({error: "Please add all fields"});
    }
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test( email );
    if(!isValid){
        return res.status(422).json({error: "INVALID EMAIL !!"});
    }
    try{
        const userWithEmail = await db.query("SELECT * from users where email = $1",[email]);
        if(userWithEmail.rows.length){
            return res.status(422).json({error: "User Exists With This Email !!!"});
        }

        const hashedPass = await bcrypt.hash(password, 8);
        const {rows} = await db.query("INSERT INTO users (first_name, last_name, email, password) values ($1, $2, $3, $4) RETURNING *", 
                        [first_name, last_name, email, hashedPass]);
        if(!rows.length){
            return res.status(422).json({error: "Some Error occured !! Please Check all of your Inputs"});
        }
        res.status(200).json({message: "Account Created Successfully"});
    }catch(err){
        return res.status(422).json({error: "Some Error occured !! Please Check all of your Inputs"});
    }
});

//login
router.post('/signin', async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const {rows} = await db.query("SELECT * from users where email = $1",[email]);
        if(!rows.length){
            return res.status(422).json({error: "Invalid Email or password!!"});
        }
        const doMatch = await bcrypt.compare(password, rows[0].password);
        if(!doMatch){
            return res.status(422).json({error: "Invalid Email or password!!"});
        }

        const token = jwt.sign({user_id: rows[0].user_id}, 'abcd123');
        const {first_name, last_name, user_id} = rows[0];
        res.status(200).json({token, user:{user_id, first_name, last_name, email}});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Some Error occured !!"})
    }
});

//get a user
router.get('/user/:id', auth, async(req,res)=>{
    const id = req.params.id;
    try{
        const {rows} = await db.query("SELECT user_id, first_name, last_name, email FROM users WHERE user_id = $1",[id]);
        if(!rows.length){
            return res.status(404).json({error: "No user found"});
        }
        res.status(200).json({user: rows[0]});
    }catch(err){
        res.status(500).json({error: "Some Error occured !!"});
    }
});

//get all users
router.get('/alluser', auth, async(req, res)=>{
    try{
        const {rows} = await db.query("SELECT user_id, first_name, last_name, email FROM users");
        res.status(200).json({users: rows});
    }catch(err){
        res.status(500).json({error: "Some Error occured !!"});
    }
})

router.post('/autologin', auth, async(req, res)=>{
    res.status(200).json({user: req.currentUser})
});

module.exports = router;