import pkg from 'jsonwebtoken';
const { verify } = pkg;
import {ErrorHandler, TryCatch} from '../middleware/error.js';

const isHead=TryCatch(async(req,res,next)=>{
   const headToken=req.cookies["token"];
  
   if(!headToken) return next(new ErrorHandler("Provide Token",401));

   const verifyToken=await verify(headToken,process.env.JWT_SECRET);
   if(!verifyToken) return next(new ErrorHandler("Login Please",401));
   
   req.headId=verifyToken._id;
   next();
})

const isManager=TryCatch(async(req,res,next)=>{
    const managerToken=req.cookies["manager-token"]||"hello";
    console.log(managerToken);
    if(!managerToken) return next(new ErrorHandler("Provide Token",401));
    
    const verifyToken=await verify(managerToken,process.env.JWT_SECRET);
    if(!verifyToken) return next(new ErrorHandler("Login Please",401));
    
    req.managerId=verifyToken._id;
    next();
})

export {isHead,isManager};