import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleCardResponseDto, ModuleResponseDto } from './dtos/module.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post('/create')
  async create(
    @Body() moduleDto: Omit<ModuleCardResponseDto, 'module_id'>,
    @Headers('x-user-id') userId: string,
  ): Promise<ModuleCardResponseDto> {
    if (!userId) {
      throw new UnauthorizedException(
        'User ID is required in x-user-id header',
      );
    }

    return await this.moduleService.create(moduleDto, userId);
  }

  @Get('/id/:id')
  async getModuleById(@Param('id') id: string): Promise<any> {
    return await this.moduleService.getModuleById(id);
  }

  @Get('/recents')
  async getRecentModules(): Promise<any> {
    return await this.moduleService.getRecentModules();
  }
}
