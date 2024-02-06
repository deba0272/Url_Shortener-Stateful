const express=require("express");
const {generateNewUrl,handleAnalytics}=require("../controllers/url");   
const router=express.Router();
router
.post("/",generateNewUrl);//create 
router
.get("/analytics/:shortId",handleAnalytics);
router
.get("/signup",(req,res)=>{//read
return res.render("signup");
});
router
.get("/login",(req,res)=>{//read
return res.render("login")
});

module.exports=router;