const mongoose=require('mongoose')
const db=require('../models')
const Role=db.role

module.exports=initial=()=>{
    Role.estimatedDocumentCount((err,count)=>{
        if(!err && count==0){
            new Role({
                name:"user"
            }).save(err=>{
                if(err){
                    console.log(`error`,err)
                }
                console.log("added 'user' to the roles collection")
            })
            new Role({
                name:"admin"
            }).save(err=>{
                if(err){
                    console.log('error',err)
                }
                console.log("added 'admin' t othe roles collection")
            })
            new Role({
                name:"moderator"
            }).save(err=>{
                if(err){
                    console.log('error',err)
                }
                console.log("added 'moderator' to the roles collection")
            })
        }
    })
}