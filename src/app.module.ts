import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SpecialityModule } from './speciality/speciality.module';
import { WorkersModule } from './workers/workers.module';
import { AnimalTypeModule } from './animal_type/animal_type.module';
import { AnimalsModule } from './animals/animals.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { VaccationHistoryModule } from './vaccation_history/vaccation_history.module';
import { MeatProductionModule } from './meat_production/meat_production.module';
import { FiberProductionModule } from './fiber_production/fiber_production.module';
import { MilkProductionModule } from './milk_production/milk_production.module';
import { RecordOfIlnessModule } from './record_of_ilness/record_of_ilness.module';
import { FeedingModule } from './feeding/feeding.module';
import { InfoModule } from './info/info.module';
import { BlocksModule } from './blocks/blocks.module';
import { RecordOfFeedingModule } from './record_of_feeding/record_of_feeding.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AdminModule,
    SpecialityModule,
    WorkersModule,
    AnimalTypeModule,
    AnimalsModule,
    VaccineModule,
    VaccationHistoryModule,
    MeatProductionModule,
    FiberProductionModule,
    MilkProductionModule,
    RecordOfIlnessModule,
    FeedingModule,
    InfoModule,
    BlocksModule,
    RecordOfFeedingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
