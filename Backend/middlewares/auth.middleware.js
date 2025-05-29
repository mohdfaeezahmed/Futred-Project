import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

export const protectRoute = async (req,res,next) => {
    const token = req.cookies.jwt;
    try{
      if(!token){
        return res.status(401).json({message : "Unauthorized - No Token Provided."})
      }
      const decode = jwt.verify(token,process.env.ACCESS_SECRET_KEY);
      if(!decode){
        return res.status(401).json({message : "Unauthorized - No Token Provided."})
      }
      const user = await User.findById(decode.userId).select("-password");

      if(!user){
        return res.status(404).json({message : "User Not Found."})
      }

      req.user = user;

      next();

    }catch(err){
        console.log("Error in singup contoller : ", err.message);
        res.status(500).json({ message: "Internal server error!" });
    }
}

