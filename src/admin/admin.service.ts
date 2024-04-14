import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
// import { Admin, AdminDocument } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { Admin, AdminDocument } from './schemas/admin.schemas';
import { LoginAdminDto } from './dto/login_admin_dto';

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

  // admin registration metodi yozildi bu yerga;
  async Adminregistration(createAdminDto: CreateAdminDto, res: Response) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    console.log('ishga tushdi bu yerda');
    const admin = await this.adminModel.findOne({
      email: createAdminDto.email,
    });
    if (admin) {
      throw new BadRequestException('This email is already registered');
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);
    console.log(`admin's tokens`, tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      { _id: newAdmin._id },
      { hashed_refresh_token },
      { new: true },
    );

    console.log('updateAdmin', updateAdmin);

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'admin registered ',
      admin: updateAdmin,
      tokens,
    };
    return response;
  }
  // ustoz qoshgani;
  // async create(createAdminDto: CreateAdminDto) {
  //   const { password, confirm_password } = createAdminDto;
  //   console.log('password : ', password);

  //   if (password !== confirm_password) {
  //     throw new BadRequestException('Passwords do not match');
  //   }
  //   const hashed_password = await bcrypt.hash(password, 7);

  //   console.log('hashed_password : ', hashed_password);

  //   //joylab qoyish bu yerda;
  //   const newAdmin = await this.adminModel.create({
  //     ...createAdminDto,
  //     hashed_password,
  //   });

  //   const tokens = await this.getTokens(newAdmin);

  //   const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

  //   const updatedAdmin = await this.adminModel.findByIdAndUpdate(
  //     newAdmin._id,
  //     {
  //       hashed_refresh_token,
  //     },
  //     { new: true },
  //   );
  //   return {
  //     message: 'Bekzod is the best programist in the world',
  //     updatedAdmin,
  //   };
  // }
  // admin login qilinadi bu yerda;

  // bu yerga login metodi yoziladi;

  async login(loginUserDto: LoginAdminDto, res: Response) {
    const { password } = loginUserDto;

    const admin = await this.adminModel.findOne({
      email: loginUserDto.email,
    });

    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    if (!admin.is_active) {
      throw new BadRequestException('admin it not activated');
    }
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not  match');
    }
    const tokens = await this.getTokens(admin);

    console.log('tokens ', tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      admin._id,
      { hashed_refresh_token },
      { new: true },
    );

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin logged in',
      adminData: updateAdmin,
      tokens,
    };
    console.log('bekzod');
    return response;
  }

  // bu yerga refreshToken metodi yoziladi bu yerga;

  async refreshToken(adminId: string, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);

    console.log('adminId', adminId);
    console.log('decodedToken', decodedToken);

    if (adminId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilamgan ');
    }

    const admin = await this.adminModel.findOne({ _id: adminId });
    console.log('refreshToken metodi ichidagi admin', admin);

    if (!admin || !admin.hashed_refresh_token) {
      console.log('dadad');
      throw new BadRequestException('admin not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(admin);
    console.log('tokens ', tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updateADmin = await this.adminModel.findByIdAndUpdate(
      { _id: admin._id },
      { $set: { hashed_refresh_token: hashed_refresh_token } },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshed',
      adminData: updateADmin,
      tokens,
    };
    return response;
  }
  //logout metodi yozildi bu yerga;
  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('admin not verifed');
    }
    console.log('adminData', adminData);

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      adminData.id,
      { $set: { hashed_refresh_token: null } },
      { new: true },
    );

    console.log('updatedAdmin', updatedAdmin);

    res.clearCookie('refresh_token');
    const response = {
      message: 'admin logged out successfully',
      updatedAdminData: updatedAdmin,
      hashed_refresh_token: updatedAdmin.hashed_refresh_token,
    };
    return response;
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
    console.log('remove  bosildi');
    return this.adminModel.deleteOne({ _id: id });
  }
}
