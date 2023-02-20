const express = require("express");
const {PostModel} = require("../models/post.model")
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    const device = req.query.device;
    // const device1 = req.query.device1
    // const device2 = req.query.device2
    const query = {}
    if(device){
        query.device =device
    }
    // if (device1 && device2) {
    //   query= {device:{device1,device2}};
    // }
    const posts = await PostModel.find({"userId":req.body.userId});
    if(posts.length){
        try {
          const user = await PostModel.find(query);
          res.send(user);
        } catch (err) {
          res.json({ msg: err });
        }

    }else{
        res.json({msg:"Create your first post"})
    }

    

})

// postRouter.get("/top", (req, res) => {});

postRouter.post("/create", async(req, res) => {
    try{
        let user = new PostModel(req.body);
        await user.save();
        res.json({msg:"Post has been created"})

    }catch(err){
        res.json({ msg: err });
    }


});
postRouter.patch("/update/:id", async(req, res) => {
    let payload = req.body;
    let id = req.query.id;
    let post = await PostModel.findOne({"_id":id});
    if(req.body.userId!==post.userId){
        res.json({msg:"you can not update someone's post"})
    }else{
        try{
            await PostModel.findByIdAndUpdate({_id:id},payload);
             res.json({msg:"post has been updated"})
        }catch(err){
            res.json({ msg: err });
        }
    }

});
postRouter.delete("/delete/:id", async(req, res) => {
    let id = req.query.id;
    let post = await PostModel.findOne({"_id":id});
    if(req.body.userId!==post.userId){
        res.json({msg:"you can not delete someone's post"})
    }else{
        try{
            await PostModel.findByIdAndDelete({_id:id});
             res.json({msg:"post has been deleted"})
        }catch(err){
            res.json({ msg: err });
        }
    }

});

module.exports={postRouter}