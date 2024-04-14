import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalTypeSchema } from './schemas/animal.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Animal.name,
        schema: AnimalTypeSchema,
      },
    ]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
