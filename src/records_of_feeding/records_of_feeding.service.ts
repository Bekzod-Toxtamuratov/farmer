import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecordsOfFeedingDto } from './dto/create-records_of_feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records_of_feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecordsOfFeeding } from './schemas/records_of_feeding.schema';
import { Model } from 'mongoose';
import { Feeding } from '../feeding/schemas/feeding.schemas';

@Injectable()
export class RecordsOfFeedingService {
  constructor(
    @InjectModel(RecordsOfFeeding.name)
    // @InjectModel(Feeding.name)
    private recordFeedingModel: Model<RecordsOfFeeding>,
    // private FeedingModel: Model<Feeding>,
  ) {}
  async create(createRecordsOfFeedingDto: CreateRecordsOfFeedingDto) {
    const { feeding_id } = createRecordsOfFeedingDto;

    // const feeding = await this.FeedingModel.findById(feeding_id);

    // if (!feeding) {
    //   throw new BadRequestException("Bunday feeding yo'q ");
    // }

    const records_of_feeding = await this.recordFeedingModel.create(
      createRecordsOfFeedingDto,
    );

    // feeding.record_of_feeding.push(records_of_feeding);
    // await feeding.save();

    return records_of_feeding;
  }

  findAll() {
    return this.recordFeedingModel.find().populate('animal_id');
  }

  findOne(id: string) {
    return this.recordFeedingModel.findById(id);
  }

  update(id: string, updateRecordsOfFeedingDto: UpdateRecordsOfFeedingDto) {
    const updatedData = this.recordFeedingModel.findByIdAndUpdate(
      id,
      updateRecordsOfFeedingDto,
    );

    return updatedData;
  }

  remove(id: string) {
    return this.recordFeedingModel.deleteOne({ _id: id });
  }
}
