import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { PrismaService } from '../prisma/prisma.service';
<<<<<<< HEAD
import { BadRequestException } from '@nestjs/common';
import {
  mockCreateModuleDto,
  mockModule,
  invalidModuleDtos,
} from './module.mock';
=======
import {
  mockModule,
  mockModule2,
  mockModuleResponseDto,
  mockModuleResponseNoContentsDto,
  mockRecentModulesCardResponseDto,
} from './module.mock';
import { mockContentResponseDto } from '../content/content.mock';
>>>>>>> dev

describe('ModuleService', () => {
  let service: ModuleService;

<<<<<<< HEAD
  const mockUser = {
    user_id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockPrismaService = {
    module: {
      create: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
=======
  const mockPrismaService = {
    module: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    content: {
      findMany: jest.fn(),
>>>>>>> dev
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

<<<<<<< HEAD
  describe('create', () => {
    const userId = 'test-user-id';

    it('should create a module successfully', async () => {
      // Arrange
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.module.create.mockResolvedValue(mockModule);

      // Act
      const result = await service.create(mockCreateModuleDto, userId);

      // Assert
      expect(result).toEqual(mockModule);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
      expect(mockPrismaService.module.create).toHaveBeenCalledWith({
        data: {
          title: mockCreateModuleDto.title,
          sinopsys: mockCreateModuleDto.sinopsys,
          thumbnail: mockCreateModuleDto.thumbnail,
          age_group: mockCreateModuleDto.age_group,
          user_id: userId,
        },
      });
      expect(mockPrismaService.module.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if user does not exist', async () => {
      // Arrange
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.create(mockCreateModuleDto, userId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.create(mockCreateModuleDto, userId)).rejects.toThrow(
        `User with ID ${userId} does not exist`,
      );
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
      expect(mockPrismaService.module.create).not.toHaveBeenCalled();
    });

    it('should throw an error if prisma create fails', async () => {
      // Arrange
      const error = new Error('Database connection failed');
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.module.create.mockRejectedValue(error);

      // Act & Assert
      await expect(service.create(mockCreateModuleDto, userId)).rejects.toThrow(
        error,
      );
      expect(mockPrismaService.module.create).toHaveBeenCalledTimes(1);
    });

    it('should handle empty title', async () => {
      // Arrange
      const validationError = new Error('Title is required');
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.module.create.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        service.create(invalidModuleDtos.emptyTitle, userId),
      ).rejects.toThrow(validationError);
    });

    it('should handle empty sinopsys', async () => {
      // Arrange
      const validationError = new Error('Sinopsys is required');
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.module.create.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        service.create(invalidModuleDtos.emptySinopsys, userId),
      ).rejects.toThrow(validationError);
    });

    it('should handle empty thumbnail', async () => {
      // Arrange
      const validationError = new Error('Thumbnail is required');
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.module.create.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        service.create(invalidModuleDtos.emptyThumbnail, userId),
      ).rejects.toThrow(validationError);
    });

    it('should handle invalid thumbnail URL', async () => {
      // Arrange
      const validationError = new Error('Thumbnail must be a valid URL');
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.module.create.mockRejectedValue(validationError);

      // Act & Assert
      await expect(
        service.create(invalidModuleDtos.invalidThumbnailUrl, userId),
      ).rejects.toThrow(validationError);
=======
  describe('getModuleById', () => {
    it('should return a module with contents if it exists', async () => {
      const moduleId = 'test-module-id';

      mockPrismaService.module.findUnique.mockResolvedValue(mockModule);
      mockPrismaService.content.findMany.mockResolvedValue([
        mockContentResponseDto,
      ]);

      const result = await service.getModuleById(moduleId);

      expect(result).toEqual(mockModuleResponseDto);
      expect(mockPrismaService.module.findUnique).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
      expect(mockPrismaService.content.findMany).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
    });

    it('should return a module with empty contents array when no contents exist', async () => {
      const moduleId = 'test-module-id';

      mockPrismaService.module.findUnique.mockResolvedValue(mockModule);
      mockPrismaService.content.findMany.mockResolvedValue([]);

      const result = await service.getModuleById(moduleId);

      expect(result).toEqual(mockModuleResponseNoContentsDto);
      expect(mockPrismaService.module.findUnique).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
      expect(mockPrismaService.content.findMany).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
    });

    it('should return BadRequestException when module does not exist', async () => {
      const moduleId = 'non-existent-module-id';

      mockPrismaService.module.findUnique.mockResolvedValue(null);

      await expect(service.getModuleById(moduleId)).rejects.toThrow(
        'Module not found',
      );
      expect(mockPrismaService.module.findUnique).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
      expect(mockPrismaService.content.findMany).not.toHaveBeenCalled();
    });
  });

  describe('getRecentModules', () => {
    it('should return an array of recent modules', async () => {
      mockPrismaService.module.findMany.mockResolvedValue([
        mockModule,
        mockModule2,
      ]);

      const result = await service.getRecentModules();

      expect(result).toEqual(mockRecentModulesCardResponseDto);
      expect(mockPrismaService.module.findMany).toHaveBeenCalledWith({
        orderBy: { creation_date: 'desc' },
      });
    });

    it('should throw BadRequestException if no recent modules are found', async () => {
      mockPrismaService.module.findMany.mockResolvedValue([]);

      await expect(service.getRecentModules()).rejects.toThrow(
        'No recent modules found',
      );
      expect(mockPrismaService.module.findMany).toHaveBeenCalledWith({
        orderBy: { creation_date: 'desc' },
      });
    });

    it('should return modules ordered by creation_date desc', async () => {
      const olderModule = {
        ...mockModule,
        creation_date: new Date('2023-01-01'),
      };
      const newerModule = {
        ...mockModule2,
        creation_date: new Date('2023-12-31'),
      };

      mockPrismaService.module.findMany.mockResolvedValue([
        newerModule,
        olderModule,
      ]);

      const result = await service.getRecentModules();

      expect(result[0]).toEqual(
        expect.objectContaining({
          title: newerModule.title,
        }),
      );
      expect(mockPrismaService.module.findMany).toHaveBeenCalledWith({
        orderBy: { creation_date: 'desc' },
      });
>>>>>>> dev
    });
  });
});
