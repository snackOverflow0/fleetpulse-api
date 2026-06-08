import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHubDto } from './dto/hub.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HubService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHubDto) {
    const companyExists = await this.prisma.company.findUnique({
      where: { id: dto.companyId }
    }) 

    if (!companyExists) {
      throw new NotFoundException('Can not make a hub: The target company is not working')
    }

    return this.prisma.hub.create({
      data: {
        name: dto.name,
        companyId: dto.companyId,
        managerId: dto.managerId
      }
    })
  }

  findAll(companyId: string) {
    return this.prisma.hub.findMany({
      where: { id: companyId },
      include: {
        manager: {
          select: {
            id: true,
            email: true,
            role: true
          }
        }
      }
    })
  }
}
