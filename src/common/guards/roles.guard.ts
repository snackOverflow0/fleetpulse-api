import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Kunin ang mga pinayagang roles na nilagay natin sa Metadata ng endpoint handler
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Kung walang linagay na restriction, open to all authenticated users ang endpoint
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Tignan kung ang role ng active user ay kasama sa listahan ng pinapayagang pumasok
    const hasRole = requiredRoles.includes(user?.role);
    if (!hasRole) {
      throw new ForbiddenException('Forbidden: Hindi sapat ang antas ng iyong account para sa action na ito.');
    }

    return true;
  }
}