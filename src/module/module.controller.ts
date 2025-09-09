// cora-backend/src/module/module.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleResponseDto,ModuleCardResponseDto } from './dtos/module.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get('/id/:id')
  async getModuleById(@Param('id') id: string): Promise<ModuleResponseDto> {
    return await this.moduleService.getModuleById(id);
  }

  @Get('search')
  async searchModules(@Query('keyword') keyword:string): Promise<ModuleCardResponseDto[]>{
    return await this.moduleService.searchModuleByKeyword(keyword);
  }
}
