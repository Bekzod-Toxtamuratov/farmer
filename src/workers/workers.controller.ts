import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { WorkersService } from './workers.service';
import { LoginWorkerDto } from './dto/login_worker_dto';
import { CookieGetter } from '../decorators/cookie_getter_descorator';

import { Response } from 'express';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}
  //   constructor(private readonly specialityService: SpecialityService) {}

  @HttpCode(200)
  @Post('signup')
  Workerregistration(
    @Body() createAdminDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workersService.Workerregistration(createAdminDto, res);
  }

  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginAdminDto: LoginWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workersService.login(loginAdminDto, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workersService.refreshToken(id, refreshToken, res);
  }

  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workersService.logout(refreshToken, res);
  }

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workersService.findOne(id);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workersService.remove(id);
  }
}
