// auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Store } from 'src/store/entities/store.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: User): Promise<User> {
    const { nama_lengkap, email, password } = registerDto;
    if (!nama_lengkap) {
      throw new BadRequestException(
        'Full name is required for user registration.',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      nama_lengkap,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async registerStore(registerDto: Store): Promise<Store> {
    const { name, email, password } = registerDto;
    if (!name) {
      throw new BadRequestException(
        'Store name is required for store registration.',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const store = this.storeRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.storeRepository.save(store);
  }

  async validateUser(loginDto: User): Promise<User | null> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateStore(loginDto: Store): Promise<Store | null> {
    const { email, password } = loginDto;
    const store = await this.storeRepository.findOne({ where: { email } });
    if (store && (await bcrypt.compare(password, store.password))) {
      return store;
    }
    return null;
  }

  async login(userOrStore: User | Store): Promise<{ access_token: string }> {
    const payload = { email: userOrStore.email, sub: userOrStore.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private tokenBlacklist: Set<string> = new Set();

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.tokenBlacklist.has(token);
  }

  async logout(token: string): Promise<void> {
    this.tokenBlacklist.add(token);
  }
}
