import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Document = HydratedDocument<Animal>;

@Schema({ versionKey: false })
export class Animal {
  @Prop({ required: true })
  animal_type_id: string;

  @Prop()
  photos: string;

  @Prop()
  unique_id: string;
}

export const AnimalTypeSchema = SchemaFactory.createForClass(Animal);
