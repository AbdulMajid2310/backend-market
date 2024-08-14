// src/auth/guards/jwt-auth.guard.ts

import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

const { Headers } = require('node-fetch');

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Use the JWT strategy to validate the token
    const isValid = await super.canActivate(context);

    if (!isValid) {
      return false;
    }

    // Check if the token is in the blacklist
    if (await this.authService.isTokenBlacklisted(request.user)) {
      throw new UnauthorizedException('Token has been invalidated');
    }

    return true;
  }

  handleRequest(err, user, info) {
    // Customizing error handling if needed
    if (err || !user) {
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }
}
