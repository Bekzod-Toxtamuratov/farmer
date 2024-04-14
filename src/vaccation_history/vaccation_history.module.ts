import { Module } from '@nestjs/common';
import { VaccationHistoryService } from './vaccation_history.service';
import { VaccationHistoryController } from './vaccation_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VaccationHistory,
  VaccineHistorySchema,
} from './schemas/vaccation_history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VaccationHistory.name,
        schema: VaccineHistorySchema,
      },
    ]),
  ],
  controllers: [VaccationHistoryController],
  providers: [VaccationHistoryService],
})
export class VaccationHistoryModule {}
