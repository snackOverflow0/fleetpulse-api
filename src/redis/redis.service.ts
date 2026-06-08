import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      host: 'localhost',
      port: 6379
    })
  }

  onModuleInit() {
      console.log('Redis High-Speed Memory Cache Engine has locked and synchronized.')
  }

  onModuleDestroy() {
      this.disconnect()
  }
}
