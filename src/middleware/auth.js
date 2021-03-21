const jwt = require('jsonwebtoken');

const db = require('../db');

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"Please authenticate!!"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,'abcd123',(err,payload)=>{
        if(err){
            return res.status(401).json({error:"Please authenticate!!"})
        }
        const {user_id} = payload
        db.query("SELECT first_name, last_name, user_id from users WHERE user_id = $1",[user_id])
        .then(userdata=>{
            if(!userdata.rows.length){
                return res.status(401).json({error:"Please authenticate"});
            }
            req.currentUser = userdata.rows[0];
            // console.log(req.currentUser);
            next()
        }).catch(e=>{
            res.status(401).json(e)
        })
    })
}