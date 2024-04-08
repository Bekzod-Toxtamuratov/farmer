import { Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@Injectable()
export class FarmerService {
  create(createFarmerDto: CreateFarmerDto) {
    return 'This action adds a new farmer';
  }

  findAll() {
    return `This action returns all farmer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farmer`;
  }

  update(id: number, updateFarmerDto: UpdateFarmerDto) {
    return `This action updates a #${id} farmer`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmer`;
  }
}
