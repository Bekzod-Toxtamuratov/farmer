import { IsNotEmpty, IsString } from 'class-validator';
export class LoginWorkerDto {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
