import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
