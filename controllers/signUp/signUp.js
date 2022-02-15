const config=require('../../config/auth.config')
const db=require('../../models')
const User=db.user
const Role=db.role

const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

exports.signup=(req,res)=>{
    const user=new User({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)

    });
    user.save((err,userdetails)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        if(req.body.roles=="admin"||req.body.roles=="moderator"){
            Role.find(
                {name:{$in:req.body.roles}},(err,roles)=>{
                    //{name:"admin"},(err,roles)=>{ 
                    if(err){
                        return res.status(500).send({message:err})
                    }
                    userdetails.roles=roles.map(role=>role._id)
                    console.log(userdetails)
                    userdetails.save(err=>{
                        if(err){
                            return res.status(500).send({message:err})
                        }
                        res.send({message:` ${req.body.roles} has been registered successfully!`})
                    })
                }
            )
        }
        // else if(req.body.roles=="admin" && req.body.roles=="moderator"){
        //     Role.find(
        //         {name:{$in:req.body.roles}},(err,roles)=>{
        //             //{name:"admin"},(err,roles)=>{ 
        //             if(err){
        //                 return res.status(500).send({message:err})
        //             }
        //             userdetails.roles=roles.map(role=>role._id)
        //             console.log(userdetails)
        //             userdetails.save(err=>{
        //                 if(err){
        //                     return res.status(500).send({message:err})
        //                 }
        //                 res.send({message:"Admin and Moderator has been registered successfully!"})
        //             })
        //         }
        //     )
        // }
        else{
            Role.findOne(
                {name:"user"},(err,role)=>{
                    if(err){
                        return res.status(500).send({message:err})
                    }
                    user.roles=[role._id];
                    user.save(err=>{
                        if(err){
                            return res.status(500).send({message:err})
                        }
                        return res.send({message:"User has been registered successfully!"})
                    })

                }
            )
        }
    })
}
