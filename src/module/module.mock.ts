import { Module } from '@prisma/client';
<<<<<<< HEAD
import { CreateModuleDto } from './dto/create-module.dto';

export const mockCreateModuleDto: CreateModuleDto = {
  title: 'Test Module',
  sinopsys: 'This is a test module description',
  thumbnail: 'https://test-bucket.s3.amazonaws.com/test-image.jpg',
  age_group: '3-5',
};

export const mockModule: Module = {
  module_id: 'test-module-id',
  title: 'Test Module',
  sinopsys: 'This is a test module description',
  thumbnail: 'https://test-bucket.s3.amazonaws.com/test-image.jpg',
  age_group: '3-5',
  user_id: 'temp-user-id',
  creation_date: new Date(),
  views: 0,
  updatedAt: new Date(),
};

export const mockModules: Module[] = [
  mockModule,
  {
    ...mockModule,
    module_id: 'test-module-id-2',
    title: 'Second Test Module',
    sinopsys: 'This is another test module description',
  },
];

// Invalid DTOs for testing incomplete/invalid data
export const invalidModuleDtos = {
  missingTitle: {
    sinopsys: 'This is a test module description',
    thumbnail: 'https://test-bucket.s3.amazonaws.com/test-image.jpg',
    age_group: '3-5',
  },

  missingSinopsys: {
    title: 'Test Module',
    thumbnail: 'https://test-bucket.s3.amazonaws.com/test-image.jpg',
    age_group: '3-5',
  },

  missingThumbnail: {
    title: 'Test Module',
    sinopsys: 'This is a test module description',
    age_group: '3-5',
  },

  missingAgeGroup: {
    title: 'Test Module',
    sinopsys: 'This is a test module description',
    thumbnail: 'https://test-bucket.s3.amazonaws.com/test-image.jpg',
  },

  emptyTitle: {
    title: '',
    sinopsys: 'This is a test module description',
    thumbnail: 'https://test-bucket.s3.amazonaws.com/test-image.jpg',
    age_group: '3-5',
  },

  emptySinopsys: {
    title: 'Test Module',
    sinopsys: '',
    thumbnail: 'https://test-bucket.s3.amazonaws.com/test-image.jpg',
    age_group: '3-5',
  },

  emptyThumbnail: {
    title: 'Test Module',
    sinopsys: 'This is a test module description',
    thumbnail: '',
    age_group: '3-5',
  },

  emptyAgeGroup: {
    title: 'Test Module',
    sinopsys: 'This is a test module description',
    thumbnail: 'https://test-bucket.s3.amazonaws.com/test-image.jpg',
    age_group: '',
  },

  invalidThumbnailUrl: {
    title: 'Test Module',
    sinopsys: 'This is a test module description',
    thumbnail: 'not-a-valid-url',
    age_group: '3-5',
  },

  nullValues: {
    title: null,
    sinopsys: null,
    thumbnail: null,
    age_group: null,
  },

  undefinedValues: {
    title: undefined,
    sinopsys: undefined,
    thumbnail: undefined,
    age_group: undefined,
  },
};
=======
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

export const mockModule2: Module = {
  module_id: 'test-module-id-2',
  title: 'Module Title 2',
  sinopsys: 'This is another test module sinopsys.',
  thumbnail: 'another-image.jpg',
  age_group: '8-10',
  views: 2,
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

export const mockRecentModulesCardResponseDto = [
  {
    module_id: 'test-module-id',
    title: 'Module Title',
    sinopsys: 'This is a test module sinopsys.',
    thumbnail: 'image.jpg',
    age_group: '5-7',
  },
  {
    module_id: 'test-module-id-2',
    title: 'Module Title 2',
    sinopsys: 'This is another test module sinopsys.',
    thumbnail: 'another-image.jpg',
    age_group: '8-10',
  },
];
>>>>>>> dev
