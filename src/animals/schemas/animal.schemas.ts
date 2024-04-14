import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type Document = HydratedDocument<Animal>;
@Schema({ versionKey: false })
export class Animal {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_type_id: Animal;

  @Prop()
  photos: string;

  @Prop()
  unique_id: string;
}

export const AnimalTypeSchema = SchemaFactory.createForClass(Animal);
