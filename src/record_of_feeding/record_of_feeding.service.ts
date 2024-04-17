import { Injectable } from '@nestjs/common';
import { CreateRecordOfFeedingDto } from './dto/create-record_of_feeding.dto';
import { UpdateRecordOfFeedingDto } from './dto/update-record_of_feeding.dto';

@Injectable()
export class RecordOfFeedingService {
  create(createRecordOfFeedingDto: CreateRecordOfFeedingDto) {
    return 'This action adds a new recordOfFeeding';
  }

  findAll() {
    return `This action returns all recordOfFeeding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recordOfFeeding`;
  }

  update(id: number, updateRecordOfFeedingDto: UpdateRecordOfFeedingDto) {
    return `This action updates a #${id} recordOfFeeding`;
  }

  remove(id: number) {
    return `This action removes a #${id} recordOfFeeding`;
  }
}
