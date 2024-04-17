import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Feeding } from '../../feeding/schemas/feeding.schemas';
export type Document = HydratedDocument<RecordsOfFeeding>;
@Schema({ versionKey: false })
export class RecordsOfFeeding {
  @Prop()
  date: number;

  @Prop()
  comsumtion: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feeding',
  })
  feeding_id: Feeding;
}

export const RecordsOfFeedingTypeSchema =
  SchemaFactory.createForClass(RecordsOfFeeding);
