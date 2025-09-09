import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  mockModule,
  mockModuleCardResponseDto,
  mockModuleResponseDto,
  mockModuleResponseNoContentsDto,
} from './module.mock';
import { mockContentResponseDto } from '../content/content.mock';

describe('ModuleService', () => {
  let service: ModuleService;

  const mockPrismaService = {
    module: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    content: {
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
  describe('searchModuleByKeyword', () => {
    it('should return all modules that contain the keyword', async () => {
      const keyword = 'criatividade';
      const mockModules = [
        {
          module_id: mockModule.module_id,
          title: mockModule.title,
          sinopsys: mockModule.sinopsys,
          thumbnail: mockModule.thumbnail,
          age_group: mockModule.age_group,
        },
      ];
      const expectedResponse = [mockModuleCardResponseDto];

      mockPrismaService.module.findMany.mockResolvedValue(mockModules);

      const result = await service.searchModuleByKeyword(keyword);

      expect(result).toEqual(expectedResponse);
      expect(mockPrismaService.module.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: keyword, mode: 'insensitive' } },
            { sinopsys: { contains: keyword, mode: 'insensitive' } },
          ],
        },
        select: {
          module_id: true,
          title: true,
          thumbnail: true,
          sinopsys: true,
          age_group: true,
        },
      });
    });

    it('should return an empty array if no modules match the keyword', async () => {
      const keyword = 'nonexistent';
      mockPrismaService.module.findMany.mockResolvedValue([]);

      const result = await service.searchModuleByKeyword(keyword);

      expect(result).toEqual([]);
      expect(mockPrismaService.module.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: keyword, mode: 'insensitive' } },
            { sinopsys: { contains: keyword, mode: 'insensitive' } },
          ],
        },
        select: {
          module_id: true,
          title: true,
          thumbnail: true,
          sinopsys: true,
          age_group: true,
        },
      });
    });
  });
});
