import mongoose from "mongoose";
import pkg from 'mongoose';
const {model} = pkg;

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    required: true,
    enum:["A","B","C"]
  },
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendance',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Worker = mongoose.models.Worker || model("Worker",workerSchema);

