import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import {
  mockCreateModuleDto,
  mockModule,
  invalidModuleDtos,
} from './module.mock';

describe('ModuleService', () => {
  let service: ModuleService;

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
    });
  });
});
