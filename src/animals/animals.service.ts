import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './schemas/animal.schemas';

@Injectable()
export class AnimalsService {
  constructor(@InjectModel(Animal.name) private animalsModel: Model<Animal>) {}
  create(createAnimalDto: CreateAnimalDto) {
    return this.animalsModel.create(createAnimalDto);
  }

  findAll() {
    return this.animalsModel
      .find()
      .populate('meat_productions')
      .populate('fiberProductions')
      .populate('milkProduct')
      .populate('record_of_ilnesS');
    // return this.specModel.find().populate('workers');
    //
  }
  /* async function findAll() {
  try {
    const animals = await this.animalsModel.find().populate('meat_productions', 'fiberProductions');
    return animals;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
}
 */

  findOne(id: string) {
    return this.animalsModel.findById(id);
  }

  update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const updatedData = this.animalsModel.findByIdAndUpdate(
      id,
      updateAnimalDto,
    );

    return updatedData;
  }

  remove(id: string) {
    return this.animalsModel.deleteOne({ _id: id });
  }
}
