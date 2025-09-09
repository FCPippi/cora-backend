import { IsString } from 'class-validator';

export class ContentResponseDto {
  @IsString()
  content_id: string;

  @IsString()
  text: string;

  @IsString()
  image: string;

  @IsString()
  template: string;

  @IsString()
  video_link: string;
}
