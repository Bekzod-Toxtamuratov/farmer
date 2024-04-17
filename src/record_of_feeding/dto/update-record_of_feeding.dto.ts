import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordOfFeedingDto } from './create-record_of_feeding.dto';

export class UpdateRecordOfFeedingDto extends PartialType(CreateRecordOfFeedingDto) {}
