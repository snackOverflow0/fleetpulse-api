import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/vehicle.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVehicleDto) {
    const hubExists = await this.prisma.hub.findUnique({
      where: { id: dto.hubId }
    }) 

    if (!hubExists) {
      throw new NotFoundException('Target Hub cannot found')
    }

    return this.prisma.vehicle.create({
      data: {
        plateNo: dto.plateNo,
        type: dto.plateNo,
        hubId: dto.hubId,
        driverId: dto.driverId || null,
        status: 'IDLE'
      }
    })
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { shipments: true }
    })

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found')
    } 

    return vehicle
  }
}
