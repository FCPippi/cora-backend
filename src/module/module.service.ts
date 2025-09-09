import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@prisma/client';

@Injectable()
export class ModuleService {
  private readonly logger = new Logger(ModuleService.name);

  constructor(private prisma: PrismaService) {}

  async create(
    createModuleDto: CreateModuleDto,
    userId: string,
  ): Promise<Module> {
    try {
      this.logger.log(
        `Creating module with title: ${createModuleDto.title} for user: ${userId}`,
      );

      // Verificar se o usuário existe
      const userExists = await this.prisma.user.findUnique({
        where: { user_id: userId },
      });

      if (!userExists) {
        throw new BadRequestException(`User with ID ${userId} does not exist`);
      }

      const module = await this.prisma.module.create({
        data: {
          title: createModuleDto.title,
          sinopsys: createModuleDto.sinopsys,
          thumbnail: createModuleDto.thumbnail,
          age_group: createModuleDto.age_group,
          user_id: userId,
        },
      });

      this.logger.log(
        `Module created successfully with ID: ${module.module_id}`,
      );
      return module;
    } catch (error) {
      this.logger.error(
        `Error creating module: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }
}
