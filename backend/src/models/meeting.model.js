import { Schema,model } from "mongoose";
import { User } from "./users.models.js";


const meetingSchema=new Schema({
user_id:{type:String},
meeetingCode:{type:String,required:true},
date:{type:Date,default:Date.now,required:true},
})

const Meeting=model("Meeting",meetingSchema);

export { Meeting };