const config=require('../../config/auth.config')
const db=require('../../models')
const User=db.user
const Role=db.role;

const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


exports.signin=(req,res)=>{
    User.findOne({username:req.body.username}).populate("roles", "-__v").exec((err,user)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        if(!user){
            return res.status(401).send({message: "User Not found."})
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,user.password
        )
        if(!passwordIsValid){
            return res.status(403).send({accessToken:null,message:"Invalid Password"})
        }

        var token=jwt.sign({id:user.id},config.secret,{expiresIn:86400})
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
    
        var authorities=[];
        for(let i=0;i<user.roles.length;i++){
            authorities.push("ROLE_"+ user.roles[i].name.toUpperCase())
        }

        res.send({
            id:user._id,
            username:user.username,
            email:user.email,
            roles:authorities,
            accessToken:token,
        })
    })
}