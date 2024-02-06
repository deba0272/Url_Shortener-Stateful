//Here another model is used
const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
name:
{
    type:String,
    required:true,
},
email:
{
type:String,
unique:true,
match: [/.+\@.+\..+/,'Please fill a valid email address'],
required:true,
},    
password:
{
    type:String,
    required:true,
},
},
{timestamps:true},
);
const User=mongoose.model('user',userSchema);
module.exports=User;