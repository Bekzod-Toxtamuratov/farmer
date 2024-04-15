import mongoose from "mongoose";
export class CreateRecordOfIlnessDto {
  meat_yield: number;
  illnes_type: string;
  data_disease: string;
  medicines: string;
  data_treatment: string;
  illness_photo: string;
  animal_id: mongoose.Schema.Types.ObjectId;
  worker_id: mongoose.Schema.Types.ObjectId;
}
