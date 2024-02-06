const express=require("express");
const {handleUserSignup,handleUserLogin}=require("../controllers/user");
const router=express.Router();
router
.post("/",handleUserSignup);//for signup
router
.post("/login",handleUserLogin);//for login
module.exports=router;