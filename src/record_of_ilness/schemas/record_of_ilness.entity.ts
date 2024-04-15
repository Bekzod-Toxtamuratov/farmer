import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schemas';
import { Worker } from '../../workers/schemas/worker.schemas';
export type Document = HydratedDocument<RecordOfIlness>;
@Schema({ versionKey: false })
export class RecordOfIlness {
  @Prop()
  meat_yield: number;

  @Prop()
  illnes_type: string;

  @Prop()
  data_disease: string;

  @Prop()
  medicines: string;

  @Prop()
  data_treatment: string;

  @Prop()
  illness_photo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: Animal;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  })
  worker_id: Worker;
}

export const RecordOfIlnessTypeSchema = SchemaFactory.createForClass(RecordOfIlness);
