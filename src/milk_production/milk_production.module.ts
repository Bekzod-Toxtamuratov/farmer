import { Module } from '@nestjs/common';
import { MilkProductionService } from './milk_production.service';
import { MilkProductionController } from './milk_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal } from '../animals/schemas/animal.schemas';
import { AnimalTypeSchema } from '../animal_type/schemas/animal_type.schemas';
import { MilkProduction, MilkProductionTypeSchema } from './schemas/milk_production.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MilkProduction.name,
        schema: MilkProductionTypeSchema,
      },
      {
        name: Animal.name,
        schema: AnimalTypeSchema,
      },
    ]),
  ],
  controllers: [MilkProductionController],
  providers: [MilkProductionService],
})
export class MilkProductionModule {}
