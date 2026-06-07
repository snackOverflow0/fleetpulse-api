import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'FLEET_ACCESS_SECRET_KEY_2026'
  private readonly refreshSecret = 'FLEET_REFRESH_SECRET_KEY_2026'

  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (existingUser) {
      throw new ForbiddenException('Email is already registered')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role || 'OPERATOR'
      }
    })

    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.role)
    await this.updateRefreshToken(newUser.id, tokens.refreshToken)
    return tokens
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const tokens = await this.getTokens(user.id, user.email, user.role)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied')
    }

    const isRefreshValid = await bcrypt.compare(refreshToken, user.refreshToken)
    if (!isRefreshValid) {
      throw new ForbiddenException('Access Denied')
    }

    const tokens = await this.getTokens(user.id, user.email, user.role)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null }
    })

    return {
      success: true,
      message: 'User logged out successfully'
    }
  }

  private async getTokens(userId: string, email: string, role: string) {
    const accessToken = jwt.sign({ sub: userId, email, role }, this.jwtSecret, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ sub: userId, email, role }, this.refreshSecret, { expiresIn: '7d' })
    return { accessToken, refreshToken }
  } 

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefresh = await bcrypt.hash(refreshToken, 10)
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefresh }
    })
  }
}
