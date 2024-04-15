import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Specially } from './schemas/speciality.schemas';
import { Model } from 'mongoose';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectModel(Specially.name) private specModel: Model<Specially>,
  ) {}

  create(createSpecialityDto: CreateSpecialityDto) {
    return this.specModel.create(createSpecialityDto);
  }

  findAll() {
    return this.specModel.find().populate('workers');
  }

  findOne(id: string) {
    return this.specModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateSpecialityDto) {
    const updatedData = this.specModel.findByIdAndUpdate(id, updateAdminDto);
    return updatedData;
  }

  remove(id: string) {
    return this.specModel.deleteOne({ _id: id });
  }
}
