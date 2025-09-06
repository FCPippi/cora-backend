import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ModuleModule } from './module/module.module';
import { BoilerplateModule } from './boilerplates/boilerplate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ModuleModule,
    BoilerplateModule,
  ],
})
export class AppModule {}
