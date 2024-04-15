import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber_production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../animals/schemas/animal.schemas';
import { FiberProduction } from './schmeas/fiber_production.schemas';

@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(FiberProduction.name)
    private FiberProductionModel: Model<FiberProduction>,
    @InjectModel(Animal.name) private AnimalModel: Model<Animal>,
  ) {}

  async create(createFiberProductionDto: CreateFiberProductionDto) {
    const { animal_id } = createFiberProductionDto;

    console.log('animal_id', animal_id);
    const animal = await this.AnimalModel.findById(animal_id);

    console.log('animal ', animal);
    if (!animal) {
      throw new BadRequestException("Bunday aniamal_id yo'q ");
    }
    const fiber_production1 = await this.FiberProductionModel.create(
      createFiberProductionDto,
    );

    console.log('fiber_production1', fiber_production1);
    // fiberProductions
    animal.fiberProductions.push(fiber_production1);
    await animal.save();

    return fiber_production1;
  }

  findAll() {
    return this.FiberProductionModel.find().populate('animal_id');
  }

  findOne(id: string) {
    return this.FiberProductionModel.findById(id);
  }

  update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
    const updatedData = this.FiberProductionModel.findByIdAndUpdate(
      id,
      updateFiberProductionDto,
    );
    return updatedData;
  }

  remove(id: string) {
    return this.FiberProductionModel.deleteOne({ _id: id });
  }
}
