import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BoilerplateModule } from './boilerplates/boilerplate.module';
import { ModuleModule } from './module/module.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    BoilerplateModule,
    ModuleModule,
    AuthModule,
  ],
})
export class AppModule {}
