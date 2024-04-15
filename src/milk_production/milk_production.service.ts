import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MilkProduction } from './schemas/milk_production.schema';
import { Model } from 'mongoose';
import { Animal } from '../animals/schemas/animal.schemas';

@Injectable()
export class MilkProductionService {
  constructor(
    @InjectModel(MilkProduction.name)
    private MlikProductionModel: Model<MilkProduction>,
    @InjectModel(Animal.name) private AnimalModel: Model<Animal>,
  ) {}

  async create(createMilkProductionDto: CreateMilkProductionDto) {
    const { animal_id } = createMilkProductionDto;
    const animal = await this.AnimalModel.findById(animal_id);

    console.log('animal ', animal);
    if (!animal) {
      throw new BadRequestException("Bunday aniamal_id yo'q ");
    }
    const milkProduct = await this.MlikProductionModel.create(
      createMilkProductionDto,
    );

    animal.milkProduct.push(milkProduct);
    await animal.save();

    return milkProduct;
  }

  findAll() {
    return this.MlikProductionModel.find().populate('animal_id');
  }

  findOne(id: string) {
    return this.MlikProductionModel.findById(id);
  }

  update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    const updatedData = this.MlikProductionModel.findByIdAndUpdate(
      id,
      updateMilkProductionDto,
    );

    return updatedData;
  }

  remove(id: string) {
    return this.MlikProductionModel.deleteOne({ _id: id });
  }
}
