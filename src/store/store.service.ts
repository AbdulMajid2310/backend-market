import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly entityRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: Store) {
    const existingStore = await this.entityRepository.findOne({
      where: { username: createStoreDto.email },
    });
    if (existingStore) {
      throw new ConflictException(
        `email ${createStoreDto.email} sudah di gunakan`,
      );
    }
  }

  async findAll(): Promise<Store[]> {
    return await this.entityRepository.find();
  }

  async findOne(username: string) {
    return await this.entityRepository.findOne({ where: { username } });
  }

  async update(username: string, updateUserDto: Store) {
    const result = await this.findOne(username);
    if (!result) {
      throw new NotFoundException(`email ${username} tidak ditemukan`);
    }
    Object.assign(result, UpdateStoreDto);
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
