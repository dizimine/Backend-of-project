import pkg from 'jsonwebtoken';
const { sign } = pkg;
import {cookieOptions} from '../Utils/features.js';


const sendTokenManager=async(res,code,message,user)=>{
    const token=sign({_id:user._id},process.env.JWT_SECRET);
    return res.status(code).cookie("manager-token",token,{...cookieOptions,maxAge:1000*60*15}).json({
        success: true,
        message:message
       })
}

export {sendTokenManager};