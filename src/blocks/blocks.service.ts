import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block } from './schemas/block.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlocksService {
  constructor(@InjectModel(Block.name) private bloclModel: Model<Block>) {}

  create(createBlockDto: CreateBlockDto) {
    return this.bloclModel.create(createBlockDto);
  }

  findAll() {
    return this.bloclModel.find().populate('Infos');
  }

  findOne(id: string) {
    return this.bloclModel.findById(id);
  }

  update(id: string, updateBlockDto: UpdateBlockDto) {
    const updatedData = this.bloclModel.findByIdAndUpdate(id, updateBlockDto);

    return updatedData;
  }

  remove(id: string) {
    return this.bloclModel.deleteOne({ _id: id });
  }
}
