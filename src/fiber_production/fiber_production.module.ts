import { Module } from '@nestjs/common';
import { FiberProductionService } from './fiber_production.service';
import { FiberProductionController } from './fiber_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal } from '../animals/schemas/animal.schemas';
import { AnimalTypeSchema } from '../animal_type/schemas/animal_type.schemas';
import {
  FiberProduction,
  FiberProductionTypeSchema,
} from './schmeas/fiber_production.schemas';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FiberProduction.name,
        schema: FiberProductionTypeSchema,
      },
      {
        name: Animal.name,
        schema: AnimalTypeSchema,
      },
    ]),
  ],
  controllers: [FiberProductionController],
  providers: [FiberProductionService],
})
export class FiberProductionModule {}
