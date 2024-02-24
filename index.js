const express=require("express");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const path=require("path");
const urlRoutes=require("./routes/url");
const userRoute=require("./routes/user");
const URL=require("./models/url");
const {connectMongo}=require("./connect");
const {restrictToLoggedinUserOnly,checkAuth}=require("./middleware/auth");
const app=express();
const port=8009;
connectMongo("mongodb://localhost:27017/short")
.then(()=>console.log("connected to mongo"));
//console.log("hello");
app.set("view engine","ejs");
app.set('views',path.resolve("./views"));
app.use(express.json());//middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.get('/signup', (req, res) => {
    const data = {
      backgroundImagePath: '/Users/debajyotiroy/Desktop/shorturl/shorturl/hello.jpg',
      // other data...
    };
  
    res.render('signup', data);
  });



app.get("/test",async(req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls,
    })
});
app.get("/signup",async(req,res)=>{
return res.render("signup");
});
app.get("/login",async(req,res)=>{
    return res.render("login");
    });
app.use("/url",restrictToLoggedinUserOnly,urlRoutes);
app.use("/user",userRoute);
app.get("/:shortId",async (req,res)=>{
const shortId=req.params.shortId;
const entry=await URL.findOneAndUpdate({
shortId
},{$push:{
    totalClicks:
    {
        timestamp:Date.now()
    },
},
});
//res.redirect(entry.redirectUrl);
});
//app.get("/:shortId",async (req,res)=>{
app.listen(port,()=>{//using arrow function
    try{
    console.log("server started: http://localhost:8009");
    }
    catch(error){
        console.log("err");
    }
});
