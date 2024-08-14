import { SetMetadata } from '@nestjs/common';

export const UserRole = (...roles: number[]) => SetMetadata('roles', roles);
