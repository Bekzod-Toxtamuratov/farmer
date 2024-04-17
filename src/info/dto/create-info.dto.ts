import mongoose from 'mongoose';

export class CreateInfoDto {
  weight: number;
  color: string;
  height: number;
  breed: string;
  gender: string;
  birth_or_asquistion: string;
  block_id: mongoose.Schema.Types.ObjectId;
  animal_id: number;
  parent_id: number;
}
