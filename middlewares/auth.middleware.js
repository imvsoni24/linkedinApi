const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if (token) {
      jwt.verify(token, "vivek", (err, decoded) => {
        if (decoded) {
          req.body.userId=decoded.userId
          req.body.name=decoded.name;
          next();
        } else {
          res.json({ msg: "login first" });
        }
      });
    }else{
        res.json({msg:"Please login first"})
    }

}
module.exports={auth}