import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { Store } from './entities/store.entity';

@Controller('api/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async create(@Body() createStoreDto: Store) {
    const existingStore = await this.storeService.findOne(createStoreDto.email);
    if (existingStore) {
      throw new HttpException(
        `email ${createStoreDto.email} sudah tersedia`,
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.storeService.findOne(String(username));
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() updateStoreDto: Store) {
    return this.storeService.update(String(username), updateStoreDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.storeService.remove(String(username));
  }
}
