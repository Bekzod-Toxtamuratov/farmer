import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Animal_typeDocument = HydratedDocument<AnimalType>;
@Schema({ versionKey: false })
export class AnimalType {
  @Prop({ required: true })
  type_name: string;
  @Prop()
  describtion: string;
}

export const AnimalTypeSchema = SchemaFactory.createForClass(AnimalType);
