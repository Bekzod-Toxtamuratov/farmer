import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schemas';
export type Document = HydratedDocument<MeatProduction>;
@Schema({ versionKey: false })
export class MeatProduction {
  @Prop()
  meat_yield: number;

  @Prop()
  slaugher_data: number;

  @Prop()
  shearning_schedule: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: Animal;
}

export const MeatProductionTypeSchema =
  SchemaFactory.createForClass(MeatProduction);
