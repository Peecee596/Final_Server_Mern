const db=require('../models');
const User=db.user
const ROLES=db.ROLES;

checkDuplicateUsernameOrEmail =(req,res,next)=>{
    //username
    User.findOne({username:req.body.username}).exec((err,username)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(username){
            res.status(400).send({message: "Failed! Username is already in use!"});
            return;
        }

        //email
        User.findOne({email:req.body.email}).exec((err,email)=>{
            if(err){
                res.staus(500).send({message:err});
                return;
            }
            if(email){
                res.status(400).send({message:"Failed! Email is already in use!"});
                return;
            }
            next()
        });
    });
}

checkRolesExisted =(req,res,next)=>{
    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({message:`Failed! Role ${req.body.roles[i]} does not exist!`})
            }
        }
    }
    next();
}

const verifySignUp={
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}

module.exports=verifySignUp;