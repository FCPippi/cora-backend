import { Module } from '@prisma/client';
import { ModuleResponseDto, ModuleCardResponseDto } from './dtos/module.dto';
import { mockContentResponseDto } from '../content/content.mock';

export const mockModule: Module = {
  module_id: 'test-module-id',
  title: 'Module Title',
  sinopsys: 'This is a test module synopsis.',
  thumbnail: 'image.jpg',
  age_group: '5-7',
  views: 4,
  creation_date: new Date(),
  updatedAt: new Date(),
  user_id: '',
};

export const mockModule2: Module = {
  module_id: 'test-module-id-2',
  title: 'Module Title 2',
  sinopsys: 'This is another test module synopsis.',
  thumbnail: 'another-image.jpg',
  age_group: '8-10',
  views: 2,
  creation_date: new Date(),
  updatedAt: new Date(),
  user_id: '',
};

export const mockCreateModuleDto: ModuleCardResponseDto = {
  module_id: 'test-module-id',
  title: 'Module Title',
  sinopsys: 'This is a test module synopsis.',
  thumbnail: 'image.jpg',
  age_group: '5-7',
};

export const mockModuleResponseDto: ModuleResponseDto = {
  title: 'Module Title',
  contents: [mockContentResponseDto],
};

export const mockModuleResponseNoContentsDto: ModuleResponseDto = {
  title: 'Module Title',
  contents: [],
};

export const mockModuleResponseDto2 = {
  module_id: 'test-module-id',
  title: 'Module Title',
  sinopsys: 'This is a test module synopsis.',
  thumbnail: 'image.jpg',
  age_group: '5-7',
  user_id: '',
  contents: [mockContentResponseDto],
};

export const mockModuleCardResponseDto = {
  module_id: 'test-module-id',
  title: 'Module Title',
  sinopsys: 'This is a test module sinopsys.',
  thumbnail: 'image.jpg',
  age_group: '5-7',
};

export const mockRecentModulesCardResponseDto = [
  {
    module_id: 'test-module-id',
    title: 'Module Title',
    sinopsys: 'This is a test module synopsis.',
    thumbnail: 'image.jpg',
    age_group: '5-7',
  },
  {
    module_id: 'test-module-id-2',
    title: 'Module Title 2',
    sinopsys: 'This is another test module synopsis.',
    thumbnail: 'another-image.jpg',
    age_group: '8-10',
  },
];
