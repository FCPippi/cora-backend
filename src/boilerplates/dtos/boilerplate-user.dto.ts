import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BoilerplateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;
}
