import { Module } from '@nestjs/common';
import { MeatProductionService } from './meat_production.service';
import { MeatProductionController } from './meat_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MeatProduction,
  MeatProductionTypeSchema,
} from './schemas/meat_production.schemas';
import { Animal } from '../animals/schemas/animal.schemas';
import { AnimalTypeSchema } from '../animal_type/schemas/animal_type.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MeatProduction.name,
        schema: MeatProductionTypeSchema,
      },
      {
        name: Animal.name,
        schema: AnimalTypeSchema,
      },
    ]),
  ],
  controllers: [MeatProductionController],
  providers: [MeatProductionService],
})
export class MeatProductionModule {}
