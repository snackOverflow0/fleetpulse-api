import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { timestamp } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';

@Controller('fleet-analytics')
@UseGuards(AuthGuard('jwt'))
export class ActivityController {
  constructor(private redis: RedisService) {}

  @Get('live-score')
  async getLiveSystemStats() {
    const deliveredCount = await this.redis.get('fleet:total_delivered_packages_today') || '0';
    
    return {
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        totalDeliveredPackagesToday: parseInt(deliveredCount, 10),
      },
    };
  }

  @Get('driver-ranking')
  async getTopDrivers(@Query('hubId') hubId: string) {
    const leaderboardKey = `leaderboard:hub:${hubId}`;

    const rawRanks = await this.redis.zrevrange(leaderboardKey, 0, 4, 'WITHSCORES');

    const leaderboard: Array<{ driverId: string; deliveriesCompleted: number }> = [];
    for (let i = 0; i < rawRanks.length; i += 2) {
      leaderboard.push({
        driverId: rawRanks[i],
        deliveriesCompleted: parseInt(rawRanks[i + 1], 10),
      });
    }

    return {
      success: true,
      hubId,
      data: {
        leaderboard,
      }
    }
  }
}
