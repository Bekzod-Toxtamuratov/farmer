import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {WorkersService} from './workers.service';
import {
  Specially,
  SpeciallySchema,
} from '../speciality/schemas/speciality.schemas';
import { Worker, WorkerSchema } from './schemas/worker.schemas';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
      {
        name: Specially.name,
        schema: SpeciallySchema,
      },
    ]),
  ],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
