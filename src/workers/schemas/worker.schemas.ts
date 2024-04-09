// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { HydratedDocument } from 'mongoose';
// import { Specially } from '../../speciality/schemas/speciality.schemas';
// export type WorkerDocument = HydratedDocument<Worker>;
// @Schema({ versionKey: false })
// export class Worker {
//   @Prop({ required: true })
//   name: string;
//   @Prop()
//   age: number;
//   @Prop()
//   experience: number;
//   @Prop()
//   phone_number: string;
//   @Prop()
//   user_name: string;

//   @Prop()
//   password: string;

//   @Prop()
//   worker_schedule: string[];

//   @Prop({
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Worker',
//   })
//   speciality_id: Specially;

//   @Prop()
//   token: string;
// }

// export const WorkerSchema = SchemaFactory.createForClass(Worker);
