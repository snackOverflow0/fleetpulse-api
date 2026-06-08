import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto, UpdateShipmentStatusDto } from './dto/shipment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('shipment')
@UseGuards(AuthGuard('jwt'))
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  create(@Body() dto: CreateShipmentDto) {
    return this.shipmentService.create(dto);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateShipmentStatusDto) {
    return this.shipmentService.updateStatus(id, dto);
  }
}
