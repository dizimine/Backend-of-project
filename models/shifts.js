import mongoose,{model} from "mongoose";

const shiftSchema = new mongoose.Schema({
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Manager who created the shift
    required: true,
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Head (mining sardar) assigned to the shift
    required: true,
  },
  workers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',// List of workers assigned to this shift
    },
  ],
  shiftName:{
    type:String,
    enum:["A","B","C"]
  },
  shiftStartTime: {
    type: Date,
    required: true,
  },
  shiftEndTime: {
    type: Date,
    required: true,
  },
  gasReadings: {
    type: String, // Store gas readings recorded during the shift
    default: "",
  },
  temperature: {
    type: String, // Store temperature data from the mine
    default: "",
  },
  machineFailures: {
    type: String, // Notes on any machine failures during the shift
    default: "",
  },
  shiftCompleted: {
    type: Boolean,
    default: false, // Tracks if the shift has been completed and logged
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Shift =  mongoose.models.Shift || model("Shift",shiftSchema);
