const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db');
const auth = require('../middleware/auth');

router.post('/signup', async(req, res)=>{
    const {user_id ,first_name, last_name, email, password} = req.body;

    if(!user_id || !first_name || !last_name || !email || !password){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const userWithId = await db.query("SELECT * from users where user_id = $1",[user_id]);
        if(userWithId.rows.length){
            return res.status(422).json({error: "User Exists With This ID !!!"});
        }
        const userWithEmail = await db.query("SELECT * from users where email = $1",[email]);
        if(userWithEmail.rows.length){
            return res.status(422).json({error: "User Exists With This Email !!!"});
        }

        const hashedPass = await bcrypt.hash(password, 8);
        const newUser = await db.query("INSERT INTO users (user_id, first_name, last_name, email, password) values ($1, $2, $3, $4, $5)", 
                        [user_id, first_name, last_name, email, hashedPass ]);
        res.status(200).json({message: "User Created Successfully"});
    }catch(err){
        return res.status(422).json({error: "Some Error occured !! Please Check all of your Inputs"});
    }
});

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

router.get('/alluser', auth, async(req, res)=>{
    try{
        const {rows} = await db.query("SELECT user_id, first_name, last_name, email FROM users");
        res.status(200).json({users: rows});
    }catch(err){
        res.status(500).json({error: "Some Error occured !!"});
    }
})

module.exports = router;