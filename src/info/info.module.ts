import {Module} from '@nestjs/common';
import {InfoService} from './info.service';
import {InfoController} from './info.controller';
import { MongooseModule} from '@nestjs/mongoose';
import {Info,InfoSchema} from './schemas/info.schema';
import { Block, BlockSchema } from '../blocks/schemas/block.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Info.name,
        schema: InfoSchema,
      },
      {
        name: Block.name,
        schema: BlockSchema,
      },
    ]),
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
