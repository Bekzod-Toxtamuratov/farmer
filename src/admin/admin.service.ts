import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
// import { Admin, AdminDocument } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from './schemas/admin.schemas';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    console.log('password : ', password);

    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(password, 7);

    console.log('hashed_password : ',hashed_password);

     //joylab qoyish bu yerda;
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      newAdmin._id,
      {
        hashed_refresh_token,
      },
      { new: true },
    );
    return {message:"Bekzod is the best programist in the world",updatedAdmin};
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    const updatedData = this.adminModel.findByIdAndUpdate(id, updateAdminDto);

    console.log(updatedData);
    return updatedData;
  }

  remove(id: string) {
    // return this.adminModel.findByIdAndDelete(id); // bu ham delete qilishning 2-usuli hisoblanadi;

    return this.adminModel.deleteOne({ _id: id });
  }
}
