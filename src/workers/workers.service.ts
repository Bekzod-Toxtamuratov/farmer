// import { Injectable } from '@nestjs/common';
// import { CreateWorkerDto } from './dto/create-worker.dto';
// import { UpdateWorkerDto } from './dto/update-worker.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Specially } from '../speciality/schemas/speciality.schemas';
// import { Worker } from './schemas/worker.schemas';

// @Injectable()
// export class WorkersService {
//   constructor(
//     @InjectModel(Worker.name) private workerModel: Model<Worker>,
//     @InjectModel(Specially.name) private speciallyModel: Model<Specially>,
//   ) {}

//   async create(createWorkerDto: CreateWorkerDto) {
//     const { speciality_id } = createWorkerDto;

//     const spec = await this.speciallyModel.findById(speciality_id);
//     return 'This action adds a new worker';
//   }

//   findAll() {
//     return `This action returns all workers`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} worker`;
//   }

//   update(id: number, updateWorkerDto: UpdateWorkerDto) {
//     return `This action updates a #${id} worker`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} worker`;
//   }
// }
