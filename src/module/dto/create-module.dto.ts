import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  sinopsys: string;

  @IsUrl()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  age_group: string;
}
