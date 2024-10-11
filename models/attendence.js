import mongoose,{model} from "mongoose";

const attendanceSchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker', // Reference to the worker for this attendance record
    required: true,
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift', // Reference to the shift this attendance is for
    required: true,
  },
  present: {
    type: Boolean,
    default: false, // Tracks if the worker is present or absent
  },
  safetyGearVerified: {
    type: Boolean,
    default: false, 
    required:true// Tracks if the worker's safety gear has been verified
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Attendance = mongoose.models.Attendance||model('Attendance', attendanceSchema);
