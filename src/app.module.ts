import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { HubModule } from './hub/hub.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ShipmentModule } from './shipment/shipment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ActivityModule } from './activity/activity.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    PrismaModule, 
    AuthModule, 
    CompanyModule, 
    HubModule, 
    VehicleModule, 
    ShipmentModule, ActivityModule, RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
