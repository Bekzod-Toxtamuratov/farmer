import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schemas';
import { Vaccine } from '../../vaccine/schemas/vaccine.schemas';
import { Worker } from '../../workers/schemas/worker.schemas';
export type VaccineHistoryDocument = HydratedDocument<VaccationHistory>;

@Schema()
export class VaccationHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: Animal;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccine',
  })
  vaccine_id: Vaccine;

  @Prop()
  vaccinated_date: string;

  @Prop()
  next_vaccination_date: string;

  @Prop()
  photo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  })
  worker_id: Worker;
}

export const VaccineHistorySchema = SchemaFactory.createForClass(VaccationHistory);
