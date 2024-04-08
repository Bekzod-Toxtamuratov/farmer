import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Specially,
  SpeciallySchema,
} from '../speciality/schemas/speciality.schemas';
import { WorkerSchema } from './schemas/worker.schemas';
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
