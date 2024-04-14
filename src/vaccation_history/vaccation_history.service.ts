import { Injectable } from '@nestjs/common';
import { CreateVaccationHistoryDto } from './dto/create-vaccation_history.dto';
import { UpdateVaccationHistoryDto } from './dto/update-vaccation_history.dto';
import { VaccationHistory } from './schemas/vaccation_history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VaccationHistoryService {
  constructor(
    @InjectModel(VaccationHistory.name)
    private vaccationHistoryModel: Model<VaccationHistory>,
  ) {}

  create(createVaccationHistoryDto: CreateVaccationHistoryDto) {
    return this.vaccationHistoryModel.create(createVaccationHistoryDto);
  }

  findAll() {
    return this.vaccationHistoryModel.find();
  }

  findOne(id: string) {
    return this.vaccationHistoryModel.findById(id);
  }

  update(id: string, updateVaccationHistoryDto: UpdateVaccationHistoryDto) {
    const updatedData = this.vaccationHistoryModel.findByIdAndUpdate(
      id,
      updateVaccationHistoryDto,
    );
    return updatedData;
  }

  remove(id: string) {
    return this.vaccationHistoryModel.deleteOne({ _id: id });
  }
}
