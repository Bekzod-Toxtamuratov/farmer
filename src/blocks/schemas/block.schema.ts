import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Info } from '../../info/schemas/info.schema';
export type BlockDocument = HydratedDocument<Block>;
@Schema({ versionKey: false })
export class Block {
  @Prop()
  number: number;

  @Prop()
  describtion: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Info' }] })
  Infos: Info[];
}
export const BlockSchema = SchemaFactory.createForClass(Block);
