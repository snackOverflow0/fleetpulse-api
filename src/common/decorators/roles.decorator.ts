import { SetMetadata } from '@nestjs/common';

// Shortcut utility function so we can use @Roles('ADMIN') smoothly on controllers
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);