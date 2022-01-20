
const signInControllers=require('../controllers/signIn/signIn')
const signUpControllers=require('../controllers/signUp/signUp');
const { verifySignUp } = require('../middlewares');

module.exports=app=>{
    app.use((req,res,next)=>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
    })

    app.post("/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],
    signUpControllers.signup
    )

    app.post("/api/auth/signin",signInControllers.signin)
}