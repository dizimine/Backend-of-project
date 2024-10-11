import { faker } from "@faker-js/faker";
import { Worker } from "../models/workers.js";
import { Shift } from "../models/shifts.js";
import { User } from "../models/users.js";

const createWorkers=async(amount)=>{
    let x;
    let shift=["A","B","C"];
   try {
      const userPromise=[];
      for(let i=1; i<=amount; i++){
        x = Math.floor((Math.random() * 3));
        const tempUser=Worker.create({
            name:faker.person.fullName(),
            phoneNumber:faker.phone.number({ style: 'national' }) ,
            shift:shift[x],
        })
        userPromise.push(tempUser);
      }
      await Promise.all(userPromise);
      console.log("Worker Created");
   } catch (error) {
       console.error(error);
   }
}




const createShift=async(amount)=>{
    let x;
    let shift=["A","B","C"];
    let y;

    try {
        const shiftPromise=[];
        const heads=await User.find({role:"Head"});
        const manager= await User.findById("670903dccf34db661a61aa40");
        for(let i=1; i<=amount; i++){
          x = Math.floor((Math.random() * 3));
          y = Math.floor((Math.random() * 10));
          const tempShift=Shift.create({manager:manager._id, head:heads[y]._id,shiftName:shift[x], shiftStartTime:faker.date.soon(), shiftEndTime:faker.date.soon()});
          shiftPromise.push(tempShift);
        }
        await Promise.all(shiftPromise);
        console.log("Shift Created");
     } catch (error) {
         console.error(error);
     }
}

const createHead=async(amount)=>{
    const headPromise=[];
   try {
    for(let i=0; i<amount; i++){
      const temHead=User.create({
        name:faker.person.fullName(),
        email:faker.internet.email(),
        password:"1234"
      })
      headPromise.push(temHead);
    }
    await Promise.all(headPromise);
    console.log("Head Created");
   } catch (error) {
    console.log(error)
    console.log("Error");
   }
}
export {createWorkers,createHead,createShift};