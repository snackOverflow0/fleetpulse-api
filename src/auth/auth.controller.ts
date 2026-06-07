import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt')) // Kailangan ng valid access token para makapag-logout
  logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  // SECURED TEST ENDPOINT (Dito natin susubukan kung gumagana ang Roles Guard natin)
  @Get('admin-only')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN') // ADMIN account matrix verification layer restriction check
  testAdminPath(@GetUser() user: any) {
    return {
      message: 'Matagumpay! Nakapasok ka sa admin checkpoint line.',
      user,
    };
  }
}