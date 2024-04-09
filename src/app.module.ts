import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmerModule } from './farmer/farmer.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SpecialityModule } from './speciality/speciality.module';
// import { WorkersModule } from './workers/workers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AdminModule,
    SpecialityModule,
    // WorkersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
