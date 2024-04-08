import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SpeciallyDocument = HydratedDocument<Specially>;

@Schema()
export class Specially {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;
}

export const SpeciallySchema = SchemaFactory.createForClass(Specially);
