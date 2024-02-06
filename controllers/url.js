const shortid = require("shortid");
const URL=require("../models/url");
async function generateNewUrl(req,res){
    const body=req.body;
    if(!body.url)
        return res.status(400).json({
            error:"Url is required",
        });
    const shortID=shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        totalClicks:[],
        createdBy:req.user._id,
    });
    return res.render("home",{
        id:shortID,
    });
   // return res.json({id:shortID})
}
async  function handleAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({
        shortId,
    });
return res.json({
    totalClicks:result.totalClicks.length,
    analytics:result.totalClicks,
});
};
module.exports={
    generateNewUrl,
    handleAnalytics,
};