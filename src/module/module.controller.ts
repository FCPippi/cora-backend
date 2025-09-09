// cora-backend/src/module/module.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleResponseDto } from './dtos/module.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get(':id')
  async getModuleById(@Param('id') id: string): Promise<ModuleResponseDto> {
    return await this.moduleService.getModuleById(id);
  }
}
