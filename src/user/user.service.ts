import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly entityRepository: Repository<User>,
  ) {}

  async create(createUserDto: User) {
    const existingUser = await this.entityRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException(
        `email User ${createUserDto.email} sudah tersedia`,
      );
    }
  }

  async findAll(): Promise<User[]> {
    return await this.entityRepository.find();
  }

  findOne(username: string) {
    return this.entityRepository.findOne({ where: { username } });
  }

  async update(email: string, updateUserDto: User) {
    const result = await this.findOne(email);
    if (!result) {
      throw new NotFoundException(`email ${email} tidak ditemukan`);
    }
    Object.assign(result, UpdateUserDto);
    return this.entityRepository.save(result);
  }

  async remove(username: string): Promise<{ message: string }> {
    try {
      const result = await this.findOne(username);
      if (!result) {
        return { message: `email ${username} tidak di temukan` };
      }

      await this.entityRepository.remove(result);
      return { message: `email user ${username} berhasil dihapus` };
    } catch (error) {
      return { message: `email ${username} gagal dihapus` };
    }
  }
}
