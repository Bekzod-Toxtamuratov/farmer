import mongoose from 'mongoose';
export class CreateFiberProductionDto {
  fibier_yield: number;
  fiber_qaulity: number;
  shearning_schedule: number;
  animal_id: mongoose.Schema.Types.ObjectId;
}
