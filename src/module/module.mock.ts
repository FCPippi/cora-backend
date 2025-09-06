import { Module } from '@prisma/client';
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
