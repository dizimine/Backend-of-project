import { sendToken } from "../Lib/sendToken.js";
import { ErrorHandler, TryCatch } from "../middleware/error.js";
import {User} from "../models/users.js";
import pkg from 'bcryptjs';
import { sendTokenManager } from "../Lib/sendTokenManager.js";
const { hash ,compare} = pkg;

const newHead=TryCatch(async(req,res,next)=>{
       const {name,email,password} = req.body;
       if(!name||!email||!password) return next(new ErrorHandler("Provide the fields",401));
       const alreadyRegistered=await User.findOne({email: email});
       if(alreadyRegistered){
        return next(new ErrorHandler("User already Exists",401));
       }
       const hashpassword=await hash(password,10);
       const newUser=await User.create({name:name,email:email,password:hashpassword,role:"Head"});
       await sendToken(res,200,`Welcome ${newUser.name}`,newUser);
})

const newManager=TryCatch(async(req, res, next)=>{
    const {name,email,password,keyPassword}=req.body;
    if(!name||!email||!password||!keyPassword) return next(new ErrorHandler("Please provide credentials",400));
    const alreadyRegistered=await User.findOne({email:email});
    if(alreadyRegistered) return next(new ErrorHandler("User already registered",400));
    console.log(keyPassword!==process.env.HEAD_KEY);
    if(keyPassword!==process.env.HEAD_KEY) return next(new ErrorHandler("Wrong Key",400));

    const hashpassword=await hash(password,10);

    const newManager=await User.create({email,password:hashpassword,name,role:"Manager"});

    await sendTokenManager(res,200,`Welcome ${newManager.name}`,newManager);
})

const loginManager=TryCatch(async(req,res,next)=>{

       const {email,password}=req.body;
       if(!email||!password) return next(new ErrorHandler("Please provide credentials",400));
       const checkRegisteration=await User.findOne({email:email});
       if(!checkRegisteration) return next(new ErrorHandler("Please Register",400));
       const checkPassword=await compare(password,checkRegisteration.password);
       if(!checkPassword) return next(new ErrorHandler("Wrong password",400));

       await sendTokenManager(res,200,`Welcome ${checkRegisteration.name}`,checkRegisteration);

})

const loginHead=TryCatch(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password) return next(new ErrorHandler("Please provide credentials",400));
    const checkRegisteration=await User.findOne({email:email});
    if(!checkRegisteration) return next(new ErrorHandler("Please Register",400));
    const checkPassword=await compare(password,checkRegisteration.password);
    if(!checkPassword) return next(new ErrorHandler("Wrong password",400));

    await sendToken(res,200,`Welcome ${checkRegisteration.name}`,checkRegisteration);

})

const logoutHead=TryCatch(async(req,res,next)=>{
    const cookieOptions={
        maxAge:15*24*60*60*1000,
        sameSite:"none",
        httpOnly: true,
        secure: true

    } 
    return res.status(201).cookie("token","",cookieOptions).json({
         message:"Head logged out",
         success:true
    })
})

const logoutManager=TryCatch(async(req,res,next)=>{
    const cookieOptions={
        maxAge:15*24*60*60*1000,
        sameSite:"none",
        httpOnly: true,
        secure: true

    } 
    return res.status(201).cookie("manager-token","",cookieOptions).json({
         message:"Manager logged out",
         success:true
    })
})

export {newHead,newManager,loginHead,loginManager,logoutHead,logoutManager};