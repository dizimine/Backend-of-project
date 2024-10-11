import pkg from 'jsonwebtoken';
const { sign } = pkg;

export const sendToken=async(res,code,message,user)=>{
 const token=sign({_id:user._id},process.env.JWT_SECRET);
 const cookieOptions={
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly: true,
    secure: true

}     

return res.status(code).cookie("token",token,cookieOptions).json({
    message: message,
    success:true,
})
}