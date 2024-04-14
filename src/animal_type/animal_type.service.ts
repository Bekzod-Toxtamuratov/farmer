import { Injectable } from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalType } from './schemas/animal_type.schemas';
import { Model } from 'mongoose';

@Injectable()
export class AnimalTypeService {
  constructor(
    @InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalType>,
  ) {}
  create(createAnimalTypeDto: CreateAnimalTypeDto) {
    return this.animalTypeModel.create(createAnimalTypeDto);
  }

  findAll() {
    return this.animalTypeModel.find();
  }

  findOne(id: string) {
    return this.animalTypeModel.findById(id);
  }

  update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    const updatedData = this.animalTypeModel.findByIdAndUpdate(
      id,
      updateAnimalTypeDto,
    );

    return updatedData;
  }

  remove(id: string) {
    return this.animalTypeModel.deleteOne({ _id: id });
  }
}
