import mongoose from "mongoose";

export class CreateRecordsOfFeedingDto {
  date: number;
  comsumtion: string;
  feeding_id: mongoose.Schema.Types.ObjectId;
  // speciality_id: mongoose.Schema.Types.ObjectId;
}
