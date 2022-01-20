const config=require('../config/auth.config')
const db=require('../models')
const jwt=require('jsonwebtoken')
const Role=db.role
const User=db.user


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        res.status(403).send({message:`No Token Found`})
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            res.status(401).send({message:"Unauthorized"})
        }
        req.userId=decoded.id;
        next();
    })
}

isAdmin=(req,res,next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        Role.find(
            {_id:{$in:user.roles}},(err,roles)=>{
                if(err){
                    return res.status(500).send({message:err})
                }
                for(let i=0;i<roles.length;i++){
                    if(roles[i]=="admin"){
                        next();
                        return;
                    }
                }
                res.status(403).send({message: "Require Admin Role!"})
            }
        
        )
    })
    
}
isModerator=(req,res,next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        Role.find(
            {_id:{$in:user.roles}},(err,roles)=>{
                if(err){
                    return res.status(500).send({message:err})
                }
                for(leti=0;i<roles.length;i++){
                    if(roles[i].name=="moderator"){
                        next();
                        return;
                    }
                }
                res.status(403).send({message:"Require Moderator Role!"})
            }
        )
    })
}

const authJwt={
    verifyToken,
    isAdmin,
    isModerator
}
module.exports=authJwt;