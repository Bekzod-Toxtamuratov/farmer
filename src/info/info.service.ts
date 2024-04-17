import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Info } from './schemas/info.schema';
import { Model } from 'mongoose';

@Injectable()
export class InfoService {
  constructor(@InjectModel(Info.name) private infoModel: Model<Info>) {}

  create(createInfoDto: CreateInfoDto) {
    return this.infoModel.create(createInfoDto);
  }

  findAll() {
    return this.infoModel.find();
  }

  findOne(id: string) {
    return this.infoModel.findById(id);
  }

  update(id: string, updateInfoDto: UpdateInfoDto) {
    const updatedData = this.infoModel.findByIdAndUpdate(id, updateInfoDto);

    return updatedData;
  }

  remove(id: string) {
    return this.infoModel.deleteOne({ _id: id });
  }
}
