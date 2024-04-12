import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specially } from '../speciality/schemas/speciality.schemas';
import { Worker } from './schemas/worker.schemas';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
    @InjectModel(Specially.name) private speciallyModel: Model<Specially>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const { speciality_id } = createWorkerDto;

    const spec = await this.speciallyModel.findById(speciality_id);

    if (!spec) {
      throw new BadRequestException("Bunday spec yo'q ");
    }

    const worker = await this.workerModel.create(createWorkerDto);

    return worker;
  }

  findAll() {
    return this.workerModel.find().populate('speciality_id');
  }

  findOne(id: number) {
    return this.workerModel.findById(id);
  }
  update(id: string, updateAdminDto: UpdateWorkerDto) {
    const updatedData = this.workerModel.findByIdAndUpdate(id, updateAdminDto);

    console.log(updatedData);
    return updatedData;
  }

  remove(id: number) {
    return this.workerModel.deleteOne({ _id: id });
  }
}
