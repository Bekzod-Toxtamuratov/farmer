import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schemas';
export type Document = HydratedDocument<FiberProduction>;
@Schema({ versionKey: false })
export class FiberProduction {
  @Prop()
  fibier_yield: number;

  @Prop()
  fiber_qaulity: number;

  @Prop()
  shearning_schedule: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: Animal;
}

export const FiberProductionTypeSchema =
  SchemaFactory.createForClass(FiberProduction);
