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

  async getPopularModules(): Promise<ModuleCardResponseDto[]> {
    // Busca os 10 módulos com mais views, retornando apenas os campos do card
    const modules = await this.prisma.module.findMany({
      orderBy: { views: 'desc' },
      take: 10,
    });

    return modules.map((module) => ({
      module_id: module.module_id,
      title: module.title,
      sinopsys: module.sinopsys,
      thumbnail: module.thumbnail,
      age_group: module.age_group,
    }));
  }
}
