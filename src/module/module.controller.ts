<<<<<<< HEAD
// cora-backend/src/module/module.controller.ts
import {
  Controller,
  Post,
  Body,
  Headers,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post('/create')
  async create(
    @Body() createModuleDto: CreateModuleDto,
    @Headers('x-user-id') userId: string,
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'User ID is required in x-user-id header',
      );
    }

    try {
      return await this.moduleService.create(createModuleDto, userId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to create module',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
=======
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
>>>>>>> dev
  }
}
