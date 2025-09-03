import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  create(createModuleDto: CreateModuleDto) {
    return this.prisma.module.create({
      data: {
        name: createModuleDto.name,
        description: createModuleDto.description,
      },
    });
  }

  findAll() {
    return this.prisma.module.findMany();
  }
}
