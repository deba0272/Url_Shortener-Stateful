const {v4: uuidv4}=require("uuid");
const User=require("../models/user")
const {setUser}=require("../service/auth");
async function handleUserSignup(req,res){
const { name,email,password}=req.body;
await User.create({
    name,
    email,
    password
});
return res.redirect("/login");
}
async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({
        email,
        password,
    });
    console.log("User",user);
    //if user is not signedup then signup
    if (!user)
    return res.render("signup",
    {
        error:"Invalid Username or Password",
    });
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId);
    return res.redirect("/test");
}
module.exports={
    handleUserSignup,
    handleUserLogin,
};