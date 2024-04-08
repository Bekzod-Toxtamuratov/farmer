import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SpeciallySchema, Specially } from './schemas/speciality.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Specially.name,
        schema: SpeciallySchema,
      },
    ]),
  ],
  controllers: [SpecialityController],
  providers: [SpecialityService],
})
export class SpecialityModule {}
