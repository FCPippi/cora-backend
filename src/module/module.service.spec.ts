import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  mockCreateModuleDto,
  mockModule,
  mockModules,
  invalidModuleDtos,
} from './module.mock';

describe('ModuleService', () => {
  let service: ModuleService;

  const mockPrismaService = {
    module: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ModuleService>(ModuleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a module successfully', async () => {
      // Arrange
      mockPrismaService.module.create.mockResolvedValue(mockModule);

      // Act
      const result = await service.create(mockCreateModuleDto);

      // Assert
      expect(result).toEqual(mockModule);
      expect(mockPrismaService.module.create).toHaveBeenCalledWith({
        data: {
          title: mockCreateModuleDto.title,
          sinopsys: mockCreateModuleDto.sinopsys,
          thumbnail: mockCreateModuleDto.thumbnail,
          age_group: mockCreateModuleDto.age_group,
          user_id: 'temp-user-id',
        },
      });
      expect(mockPrismaService.module.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if prisma create fails', async () => {
      // Arrange
      const error = new Error('Database connection failed');
      mockPrismaService.module.create.mockRejectedValue(error);

      // Act & Assert
      await expect(service.create(mockCreateModuleDto)).rejects.toThrow(error);
      expect(mockPrismaService.module.create).toHaveBeenCalledTimes(1);
    });

    it('should handle empty title', async () => {
      // Arrange
      const validationError = new Error('Title is required');
      mockPrismaService.module.create.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        service.create(invalidModuleDtos.emptyTitle),
      ).rejects.toThrow(validationError);
    });

    it('should handle empty sinopsys', async () => {
      // Arrange
      const validationError = new Error('Sinopsys is required');
      mockPrismaService.module.create.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        service.create(invalidModuleDtos.emptySinopsys),
      ).rejects.toThrow(validationError);
    });

    it('should handle empty thumbnail', async () => {
      // Arrange
      const validationError = new Error('Thumbnail is required');
      mockPrismaService.module.create.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        service.create(invalidModuleDtos.emptyThumbnail),
      ).rejects.toThrow(validationError);
    });

    it('should handle invalid thumbnail URL', async () => {
      // Arrange
      const validationError = new Error('Thumbnail must be a valid URL');
      mockPrismaService.module.create.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        service.create(invalidModuleDtos.invalidThumbnailUrl),
      ).rejects.toThrow(validationError);
    });
  });

  describe('findAll', () => {
    it('should return all modules', async () => {
      // Arrange
      mockPrismaService.module.findMany.mockResolvedValue(mockModules);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockModules);
      expect(mockPrismaService.module.findMany).toHaveBeenCalledWith();
      expect(mockPrismaService.module.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no modules exist', async () => {
      // Arrange
      mockPrismaService.module.findMany.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(mockPrismaService.module.findMany).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if prisma findMany fails', async () => {
      // Arrange
      const error = new Error('Database connection failed');
      mockPrismaService.module.findMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.findAll()).rejects.toThrow(error);
      expect(mockPrismaService.module.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
