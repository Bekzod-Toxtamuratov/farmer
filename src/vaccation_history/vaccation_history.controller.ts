import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaccationHistoryService } from './vaccation_history.service';
import { CreateVaccationHistoryDto } from './dto/create-vaccation_history.dto';
import { UpdateVaccationHistoryDto } from './dto/update-vaccation_history.dto';

@Controller('vaccation-history')
export class VaccationHistoryController {
  constructor(
    private readonly vaccationHistoryService: VaccationHistoryService,
  ) {}

  @Post()
  create(@Body() createVaccationHistoryDto: CreateVaccationHistoryDto) {
    return this.vaccationHistoryService.create(createVaccationHistoryDto);
  }

  @Get()
  findAll() {
    return this.vaccationHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccationHistoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccationHistoryDto: UpdateVaccationHistoryDto,
  ) {
    return this.vaccationHistoryService.update(id, updateVaccationHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccationHistoryService.remove(id);
  }
}
