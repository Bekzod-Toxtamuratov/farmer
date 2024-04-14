import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './schemas/animal.schemas';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel(Animal.name) private animalsModel: Model<Animal>,
  ) {}
  create(createAnimalDto: CreateAnimalDto) {
    return this.animalsModel.create(createAnimalDto);
  }

  findAll() {
    return `This action returns all animals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
