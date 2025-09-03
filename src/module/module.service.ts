import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@prisma/client';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    return this.prisma.module.create({
      data: {
        title: createModuleDto.title,
        sinopsys: createModuleDto.sinopsys,
        thumbnail: createModuleDto.thumbnail,
        age_group: createModuleDto.age_group,
        user_id: 'temp-user-id',
      },
    });
  }

  async findAll(): Promise<Module[]> {
    return this.prisma.module.findMany();
  }
}
