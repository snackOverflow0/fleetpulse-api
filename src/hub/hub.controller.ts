import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { HubService } from './hub.service';
import { CreateHubDto } from './dto/hub.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('hub')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class HubController {
  constructor(private readonly hubService: HubService) {}

  @Post()
  @Roles('ADMIN', 'HUB_MANAGER')
  create(@Body() dto: CreateHubDto) {
    return this.hubService.create(dto);
  }

  @Get()
  findAll(@Query('companyId') companyId: string) {
    return this.hubService.findAll(companyId);
  }
}
