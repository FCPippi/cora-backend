import { IsString, IsNotEmpty } from 'class-validator';
import { ContentResponseDto } from '../../content/dtos/content.dto';

export class ModuleResponseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  contents: ContentResponseDto[];
}
