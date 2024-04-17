import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordOfFeedingService } from './record_of_feeding.service';
import { CreateRecordOfFeedingDto } from './dto/create-record_of_feeding.dto';
import { UpdateRecordOfFeedingDto } from './dto/update-record_of_feeding.dto';

@Controller('record-of-feeding')
export class RecordOfFeedingController {
  constructor(private readonly recordOfFeedingService: RecordOfFeedingService) {}

  @Post()
  create(@Body() createRecordOfFeedingDto: CreateRecordOfFeedingDto) {
    return this.recordOfFeedingService.create(createRecordOfFeedingDto);
  }

  @Get()
  findAll() {
    return this.recordOfFeedingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordOfFeedingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordOfFeedingDto: UpdateRecordOfFeedingDto) {
    return this.recordOfFeedingService.update(+id, updateRecordOfFeedingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordOfFeedingService.remove(+id);
  }
}
