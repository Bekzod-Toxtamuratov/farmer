import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccationHistoryDto } from './create-vaccation_history.dto';

export class UpdateVaccationHistoryDto extends PartialType(CreateVaccationHistoryDto) {}
