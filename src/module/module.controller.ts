import { Controller, Get, Param } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleCardResponseDto, ModuleResponseDto } from './dtos/module.dto';

@Controller('/module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get('/id/:id')
  async getModuleById(@Param('id') id: string): Promise<ModuleResponseDto> {
    return await this.moduleService.getModuleById(id);
  }

  @Get('/recents')
  async getRecentModules(): Promise<ModuleCardResponseDto[]> {
    return await this.moduleService.getRecentModules();
  }
}
