import mongoose from "mongoose";

export class CreateMeatProductionDto {
  meat_yield: number;
  slaugher_data: number;
  shearning_schedule: number;

  animal_id: mongoose.Schema.Types.ObjectId;
}
