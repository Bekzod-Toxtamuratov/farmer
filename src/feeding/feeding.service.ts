import { Injectable } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feeding } from './schemas/feeding.schemas';
import { Model } from 'mongoose';

@Injectable()
export class FeedingService {
  constructor(
    @InjectModel(Feeding.name) private feedingModel: Model<Feeding>,
  ) {}
  create(createFeedingDto: CreateFeedingDto) {
    console.log("creteFeeding",createFeedingDto);
    return this.feedingModel.create(createFeedingDto);
  }

  findAll() {
    return this.feedingModel.find();
  }

  findOne(id: string) {
    return this.feedingModel.findById(id);
  }

  update(id: string, updateFeedingDto: UpdateFeedingDto) {
    const updatedData = this.feedingModel.findByIdAndUpdate(
      id,
      updateFeedingDto,
    );

    return updatedData;
  }

  remove(id: string) {
    return this.feedingModel.deleteOne({ _id: id });
  }
}
