const express = require("express");
const user = require("../model/userModel");
const users = require("../model/userModel");
const arr = require("../mock_data/data");
const cloudinary = require('cloudinary').v2;



const router = express.Router();
cloudinary.config({ 
    cloud_name: 'desagk6gb', 
    api_key: '781236957174783', 
    api_secret: 'ioGtgL6IL87LS3dzr0K3P5XKoLs',
    secure: true
  });

router.get("/users",async(req,res)=>{
    try{
        const user = await users.find();
        if(user.length){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({
                status:"failed"
            })
        }
    }catch(e){

    }
   
});

router.post("/users",async(req,res)=>{
    
    try {
        const user = await users.find();
        if (!user.length) {
            await users.create(arr)
        }
        else {
            const file = req.files.photo;
            cloudinary.uploader.upload(file.tempFilePath, async(err, result) => {
                if (!err) {

                    const newUser = await users.create({
                        name: req.body.name,
                        location: req.body.location,
                        description: req.body.description,
                        PostImage: result.url
                    });
                    res.status(200).json(newUser);
                }

            })
        }
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        });
    }
})

module.exports = router;