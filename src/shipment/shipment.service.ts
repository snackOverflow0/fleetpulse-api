import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto, UpdateShipmentStatusDto } from './dto/shipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateShipmentDto) {
    const hubExists = await this.prisma.hub.findUnique({
      where: { id: dto.hubId }
    })

    if (!hubExists) {
      throw new NotFoundException()
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
      throw new NotFoundException('Target package tracking not found')
    }

    if (dto.vehicleId) {
      const vehicleExists = await this.prisma.vehicle.findUnique({
        where: { id: dto.vehicleId }
      })
      if (!vehicleExists) {
        throw new NotFoundException('Target transport vehicle is not in the list')
      }
    }

    return this.prisma.shipment.update({
      where: { id },
      data: {
        status: dto.status,
        vehicleId: dto.vehicleId !== undefined ? dto.vehicleId : shipment.vehicleId
      }
    })
  }

}
