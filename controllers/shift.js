import {ErrorHandler, TryCatch} from '../middleware/error.js';
import {User} from '../models/users.js';
import {Shift} from '../models/shifts.js';
import moment from 'moment/moment.js';


const shiftCreation=TryCatch(async(req,res,next)=>{
      const {headEmail,shiftName,startTime,endTime}=req.body;

      const managerId=req.managerId;
      if(!managerId) return next(new ErrorHandler("Invalid Manager",404));
      const isManager=await User.findById(managerId);
      if(!isManager) return next(new ErrorHandler("Couldn't find Manager",404));

      if(!headEmail||!shiftName||!startTime||!endTime) return next(new ErrorHandler("Provide Credentials",404));

      const head=await User.findOne({email:headEmail});
      if(!head) return next(new ErrorHandler("No Head Found",404));

      const newShift= await Shift.create({manager:managerId, head:head._id,shiftName:shiftName, shiftStartTime:startTime, shiftEndTime:endTime});
      return res.status(200).json({
            success:true,
            shift:newShift,
            message:"Shift created successfully"
      })
})

const updateShift=TryCatch(async(req, res, next)=>{
      const {headEmail,shiftName,startTime,endTime}=req.body; 
      const {id}=req.params;
      if(!headEmail||!shiftName||!startTime||!endTime||!id) return next(new ErrorHandler("Provide All Credentials",404));

      const shift=await Shift.findById(id);
      if(!shift) return next(new ErrorHandler("no Shift found",404));
      
      const head=await User.findOne({email:headEmail});
      shift.shiftStartTime=startTime;
      shift.shiftEndTime=endTime;
      shift.shiftName=shiftName;
      shift.head=head._id;

      await shift.save();

      return res.status(200).json({
            success:true,
            message:"Shift Updated Successfully",
            shift
      })
})

const getAllShifts=TryCatch(async(req,res,next)=>{


    const AShift=await Shift.find({shiftName:"A"})
    .populate("manager","name")
    .populate("head","name");
    const transformA=AShift.map(({_id,manager,head,workers,shiftStartTime,shiftEndTime,shiftCompleted,createdAt})=>{
                    return {
                        _id,manager:manager.name,head:head.name,workers,startTime:shiftStartTime,endTime:shiftEndTime,shiftStatus:shiftCompleted,createdAt
                    }
    })


    const BShift=await Shift.find({shiftName:"B"})
    .populate("manager","name")
    .populate("head","name");
    const transformB=BShift.map(({_id,manager,head,workers,shiftStartTime,shiftEndTime,shiftCompleted,createdAt})=>{
          return {
                _id,manager:manager.name,head:head.name,workers,startTime:shiftStartTime,endTime:shiftEndTime,shiftStatus:shiftCompleted,createdAt
            }
      })


      const CShift=await Shift.find({shiftName:"C"})
      .populate("manager","name")
      .populate("head","name");
      const transformC=CShift.map(({_id,manager,head,workers,shiftStartTime,shiftEndTime,shiftCompleted,createdAt})=>{
                      return {
                          _id,manager:manager.name,head:head.name,workers,startTime:shiftStartTime,endTime:shiftEndTime,shiftStatus:shiftCompleted,createdAt
                      }
      })

      
      const allShifts={AShift:transformA, BShift:transformB, CShift:transformC};
    
    return res.status(200).json({
      success:true,
      allShifts
    })

})

const getSingleShift=TryCatch(async(req,res,next)=>{
      const {id}=req.params;

      const shift=await Shift.findById(id).populate("manager","name").populate("head","name");
      if(!shift) return next(new ErrorHandler("No Shift found",400));

      const transformShift={
            manager: shift.manager.name,
            head: shift.head.name,
            workersAmount:shift.workers.length,
            shift:shift.shiftName,
            startTime:shift.shiftStartTime,
            endTime:shift.shiftEndTime,
            gasReading:shift.gasReadings,
            temperature:shift.temperature,
            machineFailures:shift.machineFailures,
            shiftStatus:shift.shiftCompleted,
      }
      
      return res.status(200).json({
            success:true,
            transformShift
      })
})

const headShiftDetails=TryCatch(async(req,res,next)=>{
      const id=req.headId;
      const head=await User.findById(id);
      if(!head) return next(new ErrorHandler("Couldn't find Head",400));

      const headsShift=await Shift.find({head:head._id}).populate("head","name").populate("manager","name");
      if(!headsShift) return next(new ErrorHandler("Couldn't Find any Shifts",400));


      const transformShift=headsShift.map(({_id,head,manager,workers,shiftName,shiftStartTime,shiftEndTime,gasReadings,temperature,
            machineFailures,shiftCompleted
      })=>{
            return {
                  _id,head:head.name,manager:manager.name,workers:workers,Shiftstatus:shiftCompleted,gasReadings:gasReadings,temperature:temperature,machineFailures,startShift:shiftStartTime,endShift:shiftEndTime,shift:shiftName
            }
      })

      return res.status(200).json({
            success: true,
            transformShift
      })
})

const getTodayShift=TryCatch(async(req, res, next)=>{
      // Get the current date
      const startOfDay = moment().startOf('day').toDate();  // Midnight today
      const endOfDay = moment().endOf('day').toDate();      // 11:59:59 PM today
  
      // Query to find all shifts that start today or end today
      const shiftsToday = await Shift.find({
        shiftStartTime: { $gte: startOfDay, $lte: endOfDay }
      });

      return res.status(200).json({
            success: true,
            shiftsToday
      })
})


export {shiftCreation,updateShift,getAllShifts,getSingleShift,headShiftDetails,getTodayShift};