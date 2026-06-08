import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { HubModule } from './hub/hub.module';

@Module({
  imports: [PrismaModule, AuthModule, CompanyModule, HubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
