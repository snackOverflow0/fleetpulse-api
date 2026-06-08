import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { HubModule } from './hub/hub.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ShipmentModule } from './shipment/shipment.module';

@Module({
  imports: [PrismaModule, AuthModule, CompanyModule, HubModule, VehicleModule, ShipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
