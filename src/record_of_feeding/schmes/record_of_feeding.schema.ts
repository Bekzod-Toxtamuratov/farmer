import { Feeding } from './../../feeding/schemas/feeding.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type RecordOfFeedingDocument = HydratedDocument<RecordOfFeeding>;
@Schema({ versionKey: false })
export class RecordOfFeeding {
  @Prop()
  date: string;

  @Prop()
  consuption: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feeding',
  })
  feeding_id: Feeding;

}
export const BlockSchema = SchemaFactory.createForClass(RecordOfFeeding);
