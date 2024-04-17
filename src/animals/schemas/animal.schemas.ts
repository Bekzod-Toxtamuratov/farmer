import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MeatProduction } from '../../meat_production/schemas/meat_production.schemas';
import { FiberProduction } from '../../fiber_production/schmeas/fiber_production.schemas';
import { MilkProduction } from '../../milk_production/schemas/milk_production.schema';
import { RecordOfIlness } from '../../record_of_ilness/schemas/record_of_ilness.entity';
import { AnimalType } from '../../animal_type/schemas/animal_type.schemas';
export type Document = HydratedDocument<Animal>;
@Schema({ versionKey: false })
export class Animal {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnimalType',
  })
  animal_type_id: string;

  @Prop()
  photos: string;

  @Prop()
  unique_id: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'FiberProduction' }] })
  fiberProductions: FiberProduction[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'MeatProduction' }] })
  meat_productions: MeatProduction[];

  // milkProduct

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'MilkProduction' }] })
  milkProduct: MilkProduction[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'RecordOfIlness' }] })
  record_of_ilnesS: RecordOfIlness[];
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
