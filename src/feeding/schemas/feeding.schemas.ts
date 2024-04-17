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

  //   @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'FiberProduction' }] })
  //   fiberProductions: FiberProduction[];

  //   @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'MeatProduction' }] })
  //   meat_productions: MeatProduction[];

  //   // milkProduct

  //   @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'MilkProduction' }] })
  //   milkProduct: MilkProduction[];

  //   @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'RecordOfIlness' }] })
  //   record_of_ilnesS: RecordOfIlness[];
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding);
