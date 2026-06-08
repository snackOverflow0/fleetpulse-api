import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { RedisService } from "src/redis/redis.service";

export interface FleetLogPayload {
  action: 'SHIPMENT_CREATED' | 'SHIPMENT_DELIVERED' | 'VEHICLE_EN_ROUTE'
  userId: string
  hubId: string
}

@Injectable()
export class ActivityListener {
  constructor(private redis: RedisService) {}

  @OnEvent('fleet.action', { async: true })
  async handleFleetActivityLog(payload: FleetLogPayload) {
    try {
      if (payload.action === 'SHIPMENT_DELIVERED') {
        await this.redis.incr('fleet:total_delivered_packages_today')

        const leaderboardKey = `leaderboard:hub:${payload.hubId}`
        await this.redis.zincrby(leaderboardKey, 1, payload.userId)

        console.log(`\x1b[35m[REDIS SYNC COMPLETE]\x1b[0m Metrics pushed to cache engine for driver ${payload.userId}`)
      }
    } catch (error) {
      console.error(`[REDIS PIPELINE CRITICAL ERROR]:`, error.message)
    }
  }
}