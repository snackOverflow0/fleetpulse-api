import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: dto.name
      }
    }) 
  }

  findAll() {
    return this.prisma.company.findMany({
      include: {
        hubs: true
      }
    })
  }
}
