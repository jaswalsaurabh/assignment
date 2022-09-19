const express = require("express");
const { User } = require("../model/UserModel");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/user/:string", async (req, res) => {
  try {
    const data = await User.find({
      $or: [
        {
          name: {
            $regex: req.params.string.toString(),
            $options: "i",
          },
        },
        {
          email: {
            $regex: req.params.string.toString(),
            $options: "i",
          },
        },
      ],
    });
    res.json({ data });
  } catch (error) {
    res.status(400);
    res.json({ message: error.message });
  }
});

router.get("/user", getJwt, async (req, res) => {
  try {
    jwt.verify(req.token,'secretkey',async(err,authData)=>{
        if(err){
            res.status(403)
            res.json({message:"Not Authorized"})
        }
        else{
            const data = await User.find();
            res.json({authData,data });
        }
    })
  } catch (error) {
    res.status(400);
    res.json({ message: error.message });
  }
});

router.post("/user", async (req, res) => {
  try {
    const newUser = new User({
      uuid: req.body.uuid,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
      phone_number: req.body.phone_number,
    });
    const data = await newUser.save();
    jwt.sign({newUser}, "secretkey", (err, token) => {
      res.json({ message: "User created", data, token });
    });
  } catch (error) {
    res.status(400);
    res.json({ message: error.message });
  }
});

function getJwt(req,res,next) {
    const reqHeader = req.headers['authorization']
    console.log(reqHeader);
    // check if bearer is undefined 
    if(typeof reqHeader !=="undefined"){
        const bearer = reqHeader.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    }else{
        res.status(403)
        res.json({message:"Not Auhtorized"})
    }
}

function jwtValidator(token) {
    jwt.verify(token,'secretkey',(err,data)=>{
        if(err){
            res.status(403)
            res.json({message:"Not Authorized"})
        }
        else return data
    })
}

module.exports = router;
