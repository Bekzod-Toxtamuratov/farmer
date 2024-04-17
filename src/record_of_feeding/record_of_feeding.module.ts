import { Module } from '@nestjs/common';
import { RecordOfFeedingService } from './record_of_feeding.service';
import { RecordOfFeedingController } from './record_of_feeding.controller';

@Module({
  controllers: [RecordOfFeedingController],
  providers: [RecordOfFeedingService],
})
export class RecordOfFeedingModule {}
