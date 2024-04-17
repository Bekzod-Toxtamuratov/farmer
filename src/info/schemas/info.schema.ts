import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Block } from '../../blocks/schemas/block.schema';
export type InfoDocument = HydratedDocument<Info>;
@Schema({ versionKey: false })
export class Info {
  @Prop()
  weight: number;

  @Prop()
  color: string;

  @Prop()
  height: number;

  @Prop()
  breed: string;

  @Prop()
  gender: string;

  @Prop()
  birth_or_asquistion: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Block',
  })
  block_id: Block;

  @Prop()
  animal_id: number;

  @Prop()
  parent_id: number;
}
export const InfoSchema = SchemaFactory.createForClass(Info);
