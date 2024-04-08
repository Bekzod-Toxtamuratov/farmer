import mongoose from "mongoose";

export class CreateWorkerDto{

      
  name: string;
  age: number;
  experience: number;
  phone_number: string;
  user_name: string;
  password: string;
  worker_schedule: string[];
  speciality_id: mongoose.Schema.Types.ObjectId;


}
