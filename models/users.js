import mongoose,{model} from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Manager', 'Head'],default:'Head'},
  });

  export const User= mongoose.models.User||model("User",userSchema);