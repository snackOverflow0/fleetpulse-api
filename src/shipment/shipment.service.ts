import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto, UpdateShipmentStatusDto } from './dto/shipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ShipmentService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(dto: CreateShipmentDto) {
    const hubExists = await this.prisma.hub.findUnique({
      where: { id: dto.hubId }
    })

    if (!hubExists) {
      throw new NotFoundException('Hub localization index invalid')
    }

    return this.prisma.shipment.create({
      data: {
        trackingNo: dto.trackingNo,
        recipient: dto.recipient,
        hubId: dto.hubId,
        status: 'MANIFESTED'
      }
    })
  }

  async updateStatus(id: string, dto: UpdateShipmentStatusDto) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id }
    })

    if (!shipment) {
      throw new NotFoundException('Package target tracking parameter array empty.')
    }

    if (dto.vehicleId) {
      const vehicleExists = await this.prisma.vehicle.findUnique({
        where: { id: dto.vehicleId }
      })
      if (!vehicleExists) {
        throw new NotFoundException('Transport cargo container selection unlisted.')
      }
    }

    const updatedShipment = await this.prisma.shipment.update({
      where: { id },
      data: {
        status: dto.status,
        vehicleId: dto.vehicleId !== undefined ? dto.vehicleId : shipment.vehicleId
      }
    })

    if (dto.status === 'DELIVERED') {
      this.eventEmitter.emit('fleet.action', {
        action: 'SHIPMENT_DELIVERED',
        userId: 'SYSTEM_OP_MAPPED',
        hubId: updatedShipment.hubId
      })
    }

    return updatedShipment
  }

}
