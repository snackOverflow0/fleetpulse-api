import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

export interface FleetLogPayload {
  action: 'SHIPMENT_CREATED' | 'SHIPMENT_DELIVERED' | 'VEHICLE_EN_ROUTE'
  userId: string
  hubId: string
}

@Injectable()
export class ActivityListener {
  @OnEvent('fleet.action', { async: true })
  async handleFleetActivityLog(payload: FleetLogPayload) {
    try {
      const timestamp = new Date().toISOString()
      console.log(
        `\x1b[34m[EVENT BUS INFO]\x1b[0m LOG CAPTURED | Time: ${timestamp}] | Action: ${payload.action} | Operator/Driver ID: ${payload.userId} | Hub Base: ${payload.hubId}`
      )
    } catch (error) {
      console.error(`[EVENT ERROR] Background event execution processing failed:`, error.message)
    }
  }
}