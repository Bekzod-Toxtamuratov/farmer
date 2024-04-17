import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type Document = HydratedDocument<Feeding>;
@Schema({ versionKey: false })
export class Feeding {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: string;

  @Prop()
  feeduling_schedules: string;

  @Prop()
  types_of_feed: string;

  @Prop()
  dietery: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  })
  worker_id: number;

  // @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'RecordsOfFeeding' }] })
  // record_of_feeding: RecordsOfFeeding[];
  
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding);
