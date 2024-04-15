import { Module } from '@nestjs/common';
import { RecordOfIlnessService } from './record_of_ilness.service';
import { RecordOfIlnessController } from './record_of_ilness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RecordOfIlness,
  RecordOfIlnessTypeSchema,
} from './schemas/record_of_ilness.entity';
import { Animal } from '../animals/schemas/animal.schemas';
import { AnimalTypeSchema } from '../animal_type/schemas/animal_type.schemas';
import { WorkerSchema, Worker } from '../workers/schemas/worker.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecordOfIlness.name,
        schema: RecordOfIlnessTypeSchema,
      },
      {
        name: Animal.name,
        schema: AnimalTypeSchema,
      },
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
    ]),
  ],
  controllers: [RecordOfIlnessController],
  providers: [RecordOfIlnessService],
})
export class RecordOfIlnessModule {}
