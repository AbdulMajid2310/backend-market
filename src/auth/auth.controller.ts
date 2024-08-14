// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { Store } from 'src/store/entities/store.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/user')
  async registerUser(@Body() registerDto: User) {
    if (!registerDto.nama_lengkap) {
      throw new BadRequestException(
        'Full name is required for user registration.',
      );
    }
    return this.authService.registerUser(registerDto);
  }

  @Post('register/store')
  async registerStore(@Body() registerDto: Store) {
    if (!registerDto.name) {
      throw new BadRequestException(
        'Store name is required for store registration.',
      );
    }
    return this.authService.registerStore(registerDto);
  }

  @Post('login/user')
  async loginUser(@Body() loginDto: User) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('login/store')
  async loginStore(@Body() loginDto: Store) {
    const store = await this.authService.validateStore(loginDto);
    if (!store) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(store);
  }
}
