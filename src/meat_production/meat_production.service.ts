import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMeatProductionDto } from './dto/create-meat_production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat_production.dto';
import { MeatProduction } from './schemas/meat_production.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { CreateAnimalDto } from '../animals/dto/create-animal.dto';
import { Animal } from '../animals/schemas/animal.schemas';

@Injectable()
export class MeatProductionService {
  constructor(
    @InjectModel(MeatProduction.name)
    private MeatProdcutionModel: Model<MeatProduction>,
    @InjectModel(Animal.name) private AnimalModel: Model<Animal>,
  ) {}

  // create(createMeatProductionDto: CreateMeatProductionDto) {
  //   return 'This action adds a new meatProduction';
  // }

  async create(createMeatProductionDto: CreateMeatProductionDto) {
    const { animal_id } = createMeatProductionDto;
    const animal = await this.AnimalModel.findById(animal_id);

    console.log('animal ', animal);
    if (!animal) {
      throw new BadRequestException("Bunday aniamal_id yo'q ");
    }
    const meat_production1 = await this.MeatProdcutionModel.create(
      createMeatProductionDto,
    );

    animal.meat_productions.push(meat_production1);
    await animal.save();

    return meat_production1;
  }

  findAll() {
    return this.MeatProdcutionModel.find().populate('animal_id');
  }

  findOne(id: string) {
    return this.MeatProdcutionModel.findById(id);
  }

  update(id: string, updateMeatProductionDto: UpdateMeatProductionDto) {
    const updatedData = this.MeatProdcutionModel.findByIdAndUpdate(
      id,
      updateMeatProductionDto,
    );

    return updatedData;
  }

  remove(id: string) {
    return this.MeatProdcutionModel.deleteOne({ _id: id });
  }
}
