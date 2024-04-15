import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schemas';
export type Document = HydratedDocument<MilkProduction>;
@Schema({ versionKey: false })
export class MilkProduction {
  @Prop()
  milk_yield: number;

  @Prop()
  milk_schedule: number;

  @Prop()
  milk_quatity: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: Animal;
}

export const MilkProductionTypeSchema =
  SchemaFactory.createForClass(MilkProduction);
