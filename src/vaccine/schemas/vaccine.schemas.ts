import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type VaccineDocument = HydratedDocument<Vaccine>;

@Schema({versionKey:false})
export class Vaccine {
  @Prop()
  name: string;

  @Prop()
  type: string;
}

export const VaccineSchema = SchemaFactory.createForClass(Vaccine);
