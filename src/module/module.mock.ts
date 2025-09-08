import { Module } from '@prisma/client';
import { ModuleResponseDto } from './dtos/module.dto';
import { mockContentResponseDto } from '../content/content.mock';

export const mockModule: Module = {
  module_id: 'test-module-id',
  title: 'Module Title',
  sinopsys: 'This is a test module sinopsys.',
  thumbnail: 'image.jpg',
  age_group: '5-7',
  views: 4,
  creation_date: new Date(),
  updatedAt: new Date(),
  user_id: '',
};

export const mockModuleResponseDto: ModuleResponseDto = {
  title: 'Module Title',
  contents: [mockContentResponseDto],
};

export const mockModuleResponseNoContentsDto: ModuleResponseDto = {
  title: 'Module Title',
  contents: [],
};
