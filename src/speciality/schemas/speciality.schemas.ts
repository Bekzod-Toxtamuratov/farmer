import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Worker } from '../../workers/schemas/worker.schemas';

export type SpeciallyDocument = HydratedDocument<Specially>;

@Schema({ versionKey: false })
export class Specially {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Worker' }] })
  workers: Worker[];
}

export const SpeciallySchema = SchemaFactory.createForClass(Specially);
