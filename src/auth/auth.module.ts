import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { User } from 'src/user/entities/user.entity';
import { Store } from 'src/store/entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Store]), // Add Store here
    JwtModule.register({
      secret: crypto.randomBytes(64).toString('hex'), // Generate a random secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
