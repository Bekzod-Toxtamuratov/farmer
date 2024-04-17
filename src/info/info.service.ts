import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Info } from './schemas/info.schema';
import { Model } from 'mongoose';
import { Block } from '../blocks/schemas/block.schema';
import { CreateBlockDto } from '../blocks/dto/create-block.dto';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Info.name) private infoModel: Model<Info>,
    @InjectModel(Block.name) private BlockModel: Model<Block>,
  ) {}

  async create(createInfoDto: CreateInfoDto) {
    const { block_id } = createInfoDto;
    const block = await this.BlockModel.findById(block_id);
    if (!block) {
      throw new BadRequestException("Bunday speciacilist yo'q ");
    }
    const info = await this.infoModel.create(createInfoDto);

    block.Infos.push(info);
    await block.save();
    return info;
  }

  findAll() {
    return this.infoModel.find().populate('block_id');
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
