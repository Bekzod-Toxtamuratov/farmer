import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specially } from '../speciality/schemas/speciality.schemas';
import * as bcrypt from 'bcrypt';

import { Response } from 'express';

import { JwtService } from '@nestjs/jwt';

import { Worker, WorkerDocument } from './schemas/worker.schemas';
import { LoginWorkerDto } from './dto/login_worker_dto';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
    private readonly jwtService: JwtService,
    @InjectModel(Specially.name) private speciallyModel: Model<Specially>,
  ) {}

  async getTokens(worker: WorkerDocument) {
    const payload = {
      id: worker._id,
      is_active: worker.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEYWorker,
        expiresIn: process.env.ACCESS_TOKEN_TIMEWorker,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEYWorker,
        expiresIn: process.env.REFRESH_TOKEN_TIMEWorker,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  // ************************************************
  async create(createWorkerDto: CreateWorkerDto) {
    const { speciality_id } = createWorkerDto;
    const spec = await this.speciallyModel.findById(speciality_id);
    if (!spec){
      throw new BadRequestException("Bunday speciacilist yo'q ");
    }
    const worker = await this.workerModel.create(createWorkerDto);

    spec.workers.push(worker);
    await spec.save();
    return worker;
  }
  // *******************************************************
  async Workerregistration(createWorkerDto: CreateWorkerDto, res: Response) {
    const { speciality_id } = createWorkerDto;
    const spec = await this.speciallyModel.findById(speciality_id);

    if (!spec) {
      throw new BadRequestException("Bunday speciacilist yo'q ");
    }
    const { password, confirm_password } = createWorkerDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    console.log('Worker registration ishga tushdi bu yerda');

    const worker = await this.workerModel.findOne({
      user_name: createWorkerDto.user_name,
    });
    console.log('worker', worker);
    if (worker) {
      throw new BadRequestException('This username is already registered');
    }
    const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);
    const newWorker = await this.workerModel.create({
      ...createWorkerDto,
      password: hashed_password,
    });
    const tokens = await this.getTokens(newWorker);
    console.log(`worker's tokens`, tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updateWorker = await this.workerModel.findByIdAndUpdate(
      { _id: newWorker._id },
      { token: hashed_refresh_token },
      { new: true },
    );

    console.log('updateWorker', updateWorker);

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'worker registered',
      worker: updateWorker,
      tokens,
    };
    return response;
  }
  // login worker this code
  async login(loginWorkerDto: LoginWorkerDto, res: Response) {
    const { password } = loginWorkerDto;

    const worker = await this.workerModel.findOne({
      user_name: loginWorkerDto.user_name,
    });

    if (!worker) {
      throw new BadRequestException('worker not found');
    }
    if (!worker.is_active) {
      throw new BadRequestException('worker it not activated');
    }
    const isMatchPass = await bcrypt.compare(password, worker.password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not  match');
    }
    const tokens = await this.getTokens(worker);

    console.log('tokens ', tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updateworker = await this.workerModel.findByIdAndUpdate(
      worker._id,
      { token: hashed_refresh_token },
      { new: true },
    );

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'worker logged in',
      workerData: updateworker,
      tokens,
    };
    return response;
  }

  async refreshToken(workerId: string, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);

    console.log('workerId', workerId);
    console.log('decodedToken', decodedToken);

    if (workerId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilamgan ');
    }

    const worker = await this.workerModel.findOne({ _id: workerId });
    console.log('refreshToken metodi ichidagi worker', worker);

    if (!worker || !worker.token) {
      console.log('dadad');
      throw new BadRequestException('worker not found');
    }
    const tokenMatch = await bcrypt.compare(refreshToken, worker.token);

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(worker);
    console.log('tokens ', tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updateworker = await this.workerModel.findByIdAndUpdate(
      { _id: worker._id },
      { $set: { token: hashed_refresh_token } },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'worker refreshed',
      workerData: updateworker,
      tokens,
    };
    return response;
  }
  //logout metodi yozildi bu yerga;
  async logout(refreshToken: string, res: Response) {
    const workerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEYWorker,
    });
    if (!workerData) {
      throw new ForbiddenException('worker not verifed');
    }
    console.log('workerData', workerData);

    const updatedworker = await this.workerModel.findByIdAndUpdate(
      workerData.id,
      { $set: { token: null } },
      { new: true },
    );

    console.log('updatedworker', updatedworker);

    res.clearCookie('refresh_token');
    const response = {
      message: 'worker logged out successfully',
      updatedworkerData: updatedworker,
      hashed_refresh_token: updatedworker.token,
    };
    return response;
  }

  findAll() {
    return this.workerModel.find().populate('speciality_id');
  }

  findOne(id: string) {
    return this.workerModel.findById(id);
  }
  update(id: string, updateworkerDto: UpdateWorkerDto) {
    const updatedData = this.workerModel.findByIdAndUpdate(id, updateworkerDto);
    console.log(updatedData);
    return updatedData;
  }

  remove(id: string) {
    return this.workerModel.deleteOne({ _id: id });
  }
}
