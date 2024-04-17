import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecordOfIlnessDto } from './dto/create-record_of_ilness.dto';
import { UpdateRecordOfIlnessDto } from './dto/update-record_of_ilness.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal } from '../animals/schemas/animal.schemas';
import { Model } from 'mongoose';
import { Worker } from '../workers/schemas/worker.schemas';
import { RecordOfIlness } from './schemas/record_of_ilness.entity';

@Injectable()
export class RecordOfIlnessService {
  constructor(
    @InjectModel(RecordOfIlness.name)
    private RecordOfIlnessModel: Model<RecordOfIlness>,
    @InjectModel(Animal.name) private AnimalModel: Model<Animal>,
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
  ) {}

  async create(createRecordOfIlnessDto: CreateRecordOfIlnessDto) {
    const { animal_id, worker_id } = createRecordOfIlnessDto;

    const animal = await this.AnimalModel.findById(animal_id);
    const worker = await this.workerModel.findById(worker_id);

    console.log('animal ', animal);
    console.log('worker ', worker);
    if (!animal) {
      throw new BadRequestException("Bunday aniamal_id yo'q ");
    }

    if (!worker) {
      throw new BadRequestException("Bunday worker_id yo'q ");
    }
    const recordOFIlness = await this.RecordOfIlnessModel.create(
      createRecordOfIlnessDto,
    );

    animal.record_of_ilnesS.push(recordOFIlness);
    await animal.save();

    return recordOFIlness;
  }

  // findAll() {
  //   return this.RecordOfIlnessModel.find().populate('animal_id');
  // }
  findAll() {
    return this.RecordOfIlnessModel.find().populate({
      path: 'animal_id',
      select: '', // Specify fields you want to include
    });
  }

  findOne(id: string) {
    return this.RecordOfIlnessModel.findById(id);
  }

  update(id: string, updateRecordOfIlnessDto: UpdateRecordOfIlnessDto) {
    const updatedData = this.RecordOfIlnessModel.findByIdAndUpdate(
      id,
      updateRecordOfIlnessDto,
    );

    return updatedData;
  }

  remove(id: string) {
    return this.RecordOfIlnessModel.deleteOne({ _id: id });
  }
}
