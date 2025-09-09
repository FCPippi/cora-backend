import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ModuleCardResponseDto, ModuleResponseDto } from './dtos/module.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModuleService {
  private readonly logger = new Logger(ModuleService.name);

  constructor(private prisma: PrismaService) {}

  async getModuleById(moduleId: string): Promise<ModuleResponseDto> {
    const module = await this.prisma.module.findUnique({
      where: { module_id: moduleId },
    });

    if (!module) {
      throw new BadRequestException('Module not found');
    }

    const contents = await this.prisma.content.findMany({
      where: { module_id: module.module_id },
    });

    const moduleResponse: ModuleResponseDto = {
      title: module.title,
      contents: contents.map((content) => ({
        content_id: content.content_id,
        text: content.text ?? '',
        image: content.image ?? '',
        template: content.template ?? '',
        video_link: content.video_link ?? '',
        module_id: content.module_id,
      })),
    };

    return moduleResponse;
  }
  async searchModuleByKeyword(keyword: string):Promise<ModuleCardResponseDto[]>{
  const modulos = await this.prisma.module.findMany({
    where: {
      OR:[
        {title:{contains:keyword,mode:'insensitive'}},
        {sinopsys:{contains:keyword,mode:'insensitive'}}
      ]
    },
    select: {
      module_id: true,
      title: true,
      thumbnail: true,
      sinopsys: true,
      age_group: true,
    },
  })
  const moduleCards: ModuleCardResponseDto[] = modulos.map((module) => ({
      module_id:module.module_id,
      title: module.title,
      sinopsys: module.sinopsys,
      thumbnail: module.thumbnail,
      age_group: module.age_group,
    }));
    return moduleCards;
}
}
