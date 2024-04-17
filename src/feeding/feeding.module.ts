import { Module } from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { FeedingController } from './feeding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feeding, FeedingSchema } from './schemas/feeding.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feeding.name,
        schema: FeedingSchema,
      },
    ]),
  ],
  controllers: [FeedingController],
  providers: [FeedingService],
})
export class FeedingModule {}
